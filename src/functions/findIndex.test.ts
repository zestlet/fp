import { describe, it, expect } from 'vitest';
import { findIndex } from './findIndex';

describe('findIndex', () => {
  it('应该返回满足条件的元素的第一个索引', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(findIndex(item => item > 3, array)).toBe(3);
  });

  it('当没有元素满足条件时应该返回 -1', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(findIndex(item => item > 5, array)).toBe(-1);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    expect(findIndex(item => item.name === 'Bob', array)).toBe(1);
  });

  it('当数组为空时应该返回 -1', () => {
    const array = [] as const;
    expect(findIndex(item => item > 0, array)).toBe(-1);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const findIndexGreaterThan3 = findIndex(item => (item as unknown as number) > 3);
    expect(findIndexGreaterThan3(array)).toBe(3);
  });
});
