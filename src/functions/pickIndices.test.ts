import { describe, it, expect } from 'vitest';
import { pickIndices } from './pickIndices';

describe('pickIndices', () => {
  it('应该根据索引列表选择数组中的元素', () => {
    const array = ['a', 'b', 'c', 'd'];
    expect(pickIndices([0, 2], array)).toEqual(['a', 'c']);
  });

  it('应该忽略超出数组范围的索引', () => {
    const array = ['a', 'b', 'c', 'd'];
    expect(pickIndices([0, 4, 2], array)).toEqual(['a', 'c']);
  });

  it('应该忽略负数索引', () => {
    const array = ['a', 'b', 'c', 'd'];
    expect(pickIndices([-1, 0, 2], array)).toEqual(['a', 'c']);
  });

  it('应该支持不同类型的数组', () => {
    const array = [1, 'b', true, { x: 1 }];
    expect(pickIndices([0, 2], array)).toEqual([1, true]);
  });

  it('应该支持空数组', () => {
    const array: number[] = [];
    expect(pickIndices([0, 1], array)).toEqual([]);
  });

  it('应该支持空索引列表', () => {
    const array = [1, 2, 3];
    expect(pickIndices([], array)).toEqual([]);
  });

  it('应该支持柯里化调用', () => {
    const array = ['a', 'b', 'c', 'd'];
    const pickFirstAndLast = pickIndices([0, 3]);
    expect(pickFirstAndLast(array)).toEqual(['a', 'd']);
  });
});
