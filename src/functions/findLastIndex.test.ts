import { describe, it, expect } from 'vitest';
import { findLastIndex } from './findLastIndex';

describe('findLastIndex', () => {
  it('应该返回满足条件的元素的最后一个索引', () => {
    const array = [1, 2, 3, 4, 5, 3] as const;
    expect(findLastIndex(item => item === 3, array)).toBe(5);
  });

  it('当没有元素满足条件时应该返回 -1', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(findLastIndex(item => item > 5, array)).toBe(-1);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Bob' },
    ] as const;
    expect(findLastIndex(item => item.name === 'Bob', array)).toBe(2);
  });

  it('当数组为空时应该返回 -1', () => {
    const array = [] as const;
    expect(findLastIndex(item => item > 0, array)).toBe(-1);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5, 3] as const;
    const findLastIndexEqualTo3 = findLastIndex(item => item === 3);
    expect(findLastIndexEqualTo3(array)).toBe(5);
  });
});
