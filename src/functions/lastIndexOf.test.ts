import { describe, it, expect } from 'vitest';
import { lastIndexOf } from './lastIndexOf';

describe('lastIndexOf', () => {
  it('应该返回元素在数组中的最后一个索引', () => {
    const array = [1, 2, 3, 2, 4, 5] as const;
    expect(lastIndexOf(2, array)).toBe(3);
  });

  it('当元素不存在时应该返回 -1', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(lastIndexOf(6, array)).toBe(-1);
  });

  it('应该支持对象数组', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }] as const;
    expect(lastIndexOf({ id: 2 }, array)).toBe(-1); // 对象比较是引用比较
    const obj = { id: 2 };
    const arrayWithObj = [obj, { id: 1 }, obj] as const;
    expect(lastIndexOf(obj, arrayWithObj)).toBe(2);
  });

  it('当数组为空时应该返回 -1', () => {
    const array = [] as const;
    expect(lastIndexOf(1, array)).toBe(-1);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 2, 4, 5] as const;
    const lastIndexOf2 = lastIndexOf(2);
    expect(lastIndexOf2(array)).toBe(3);
  });
});
