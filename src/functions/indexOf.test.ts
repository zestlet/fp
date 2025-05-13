import { describe, it, expect } from 'vitest';
import { indexOf } from './indexOf';

describe('indexOf', () => {
  it('应该返回元素在数组中的第一个索引', () => {
    const array = [1, 2, 3, 2, 4, 5] as const;
    expect(indexOf(2, array)).toBe(1);
  });

  it('当元素不存在时应该返回 -1', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(indexOf(6, array)).toBe(-1);
  });

  it('应该支持对象数组', () => {
    const array = [{ id: 1 }, { id: 2 }, { id: 3 }] as const;
    expect(indexOf({ id: 2 }, array)).toBe(-1); // 对象比较是引用比较
    const obj = { id: 2 };
    const arrayWithObj = [obj, { id: 1 }, { id: 3 }] as const;
    expect(indexOf(obj, arrayWithObj)).toBe(0);
  });

  it('当数组为空时应该返回 -1', () => {
    const array = [] as const;
    expect(indexOf(1, array)).toBe(-1);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 2, 4, 5] as const;
    const indexOf2 = indexOf(2);
    expect(indexOf2(array)).toBe(1);
  });
});
