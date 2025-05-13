import { describe, it, expect } from 'vitest';
import { includes } from './includes';

describe('includes', () => {
  it('应该检查数组是否包含指定元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(includes(3, array)).toBe(true);
    expect(includes(6, array)).toBe(false);
  });

  it('应该支持对象数组', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }] as const;
    expect(includes({ id: 2 }, array)).toBe(false); // 对象比较是引用比较
    const obj = { id: 2 };
    const arrayWithObj = [obj, { id: 1 }, { id: 3 }] as const;
    expect(includes(obj, arrayWithObj)).toBe(true);
  });

  it('当数组为空时应该返回 false', () => {
    const array = [] as const;
    expect(includes(1, array)).toBe(false);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const includes3 = includes(3);
    expect(includes3(array)).toBe(true);
  });
});
