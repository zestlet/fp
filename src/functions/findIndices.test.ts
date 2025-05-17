import { describe, it, expect } from 'vitest';
import { findIndices } from './findIndices';

describe('findIndices', () => {
  it('应该返回所有满足条件的元素的索引', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(findIndices((x: number) => x % 2 === 0, array)).toEqual([1, 3]);
  });

  it('当没有元素满足条件时应该返回空数组', () => {
    const array = [1, 3, 5, 7] as const;
    expect(findIndices((x: number) => x % 2 === 0, array)).toEqual([]);
  });

  it('当所有元素都满足条件时应该返回所有索引', () => {
    const array = [2, 4, 6, 8] as const;
    expect(findIndices((x: number) => x % 2 === 0, array)).toEqual([0, 1, 2, 3]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(findIndices((x: number) => x > 0, array)).toEqual([]);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'David' },
    ] as const;
    expect(findIndices(item => item.name.length > 3, array)).toEqual([0, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const findEvenIndices = findIndices((x: number) => x % 2 === 0);
    expect(findEvenIndices(array)).toEqual([1, 3]);
  });
});
