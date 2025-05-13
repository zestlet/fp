import { describe, it, expect } from 'vitest';
import { concat } from './concat';

describe('concat', () => {
  it('应该合并两个数组', () => {
    const arrayA = [1, 2, 3];
    const arrayB = [4, 5, 6];
    const result = concat(arrayB, arrayA);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('应该处理空数组', () => {
    const arrayA: number[] = [];
    const arrayB: number[] = [];
    const result = concat(arrayB, arrayA);
    expect(result).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const arrayA = [1, 2, 3];
    const arrayB = [4, 5];
    concat(arrayB, arrayA);
    expect(arrayA).toEqual([1, 2, 3]);
    expect(arrayB).toEqual([4, 5]);
  });

  it('应该支持柯里化调用', () => {
    const arrayA = ['0', 1, 2, 3];
    const arrayB = [4, 5, 6];
    const concatWithB = concat(arrayB);
    const result = concatWithB(arrayA);
    expect(result).toEqual(['0', 1, 2, 3, 4, 5, 6]);
  });

  it('柯里化调用应该保持原数组不变', () => {
    const arrayA = ['0', 1, 2, 3];
    const arrayB = [4, 5];
    const concatWithB = concat(arrayB);
    concatWithB(arrayA);
    expect(arrayA).toEqual(['0', 1, 2, 3]);
    expect(arrayB).toEqual([4, 5]);
  });
});
