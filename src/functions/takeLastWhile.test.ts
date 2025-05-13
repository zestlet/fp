import { describe, it, expect } from 'vitest';
import { takeLastWhile } from './takeLastWhile';

describe('takeLastWhile', () => {
  it('应该返回从末尾开始满足条件的连续元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(takeLastWhile((value, index, arr) => value > 2, array)).toEqual([3, 4, 5]);
  });

  it('当最后一个元素不满足条件时应该返回空数组', () => {
    const array = [1, 2, 3] as const;
    expect(takeLastWhile((value, index, arr) => value < 2, array)).toEqual([]);
  });

  it('当所有元素都满足条件时应该返回整个数组', () => {
    const array = [1, 2, 3] as const;
    expect(takeLastWhile((value, index, arr) => value > 0, array)).toEqual([1, 2, 3]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(takeLastWhile((value, index, arr) => value > 0, array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    takeLastWhile((value, index, arr) => value > 1, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const takeLastWhileGreaterThan2 = takeLastWhile((value: number, index, arr) => value > 2);
    expect(takeLastWhileGreaterThan2(array)).toEqual([3, 4, 5]);
  });
});
