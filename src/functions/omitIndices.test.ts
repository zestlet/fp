import { describe, it, expect } from 'vitest';
import { omitIndices } from './omitIndices';

describe('omitIndices', () => {
  it('应该根据索引列表排除数组中的元素', () => {
    const array = ['a', 'b', 'c', 'd'];
    expect(omitIndices([0, 2], array)).toEqual(['b', 'd']);
  });

  it('应该忽略超出数组范围的索引', () => {
    const array = ['a', 'b', 'c', 'd'];
    expect(omitIndices([0, 4, 2], array)).toEqual(['b', 'd']);
  });

  it('应该忽略负数索引', () => {
    const array = ['a', 'b', 'c', 'd'];
    expect(omitIndices([-1, 0, 2], array)).toEqual(['b', 'd']);
  });

  it('应该支持不同类型的数组', () => {
    const array = [1, 'b', true, { x: 1 }];
    expect(omitIndices([0, 2], array)).toEqual(['b', { x: 1 }]);
  });

  it('应该支持空数组', () => {
    const array: number[] = [];
    expect(omitIndices([0, 1], array)).toEqual([]);
  });

  it('应该支持空索引列表', () => {
    const array = [1, 2, 3];
    expect(omitIndices([], array)).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = ['a', 'b', 'c', 'd'];
    const omitFirstAndLast = omitIndices([0, 3]);
    expect(omitFirstAndLast(array)).toEqual(['b', 'c']);
  });
});
