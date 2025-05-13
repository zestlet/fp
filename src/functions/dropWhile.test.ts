import { describe, it, expect } from 'vitest';
import { dropWhile } from './dropWhile';

describe('dropWhile', () => {
  it('应该丢弃满足条件的连续元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(dropWhile(value => value < 4, array)).toEqual([4, 5]);
  });

  it('当第一个元素不满足条件时应该返回整个数组', () => {
    const array = [1, 2, 3] as const;
    expect(dropWhile(value => value > 1, array)).toEqual([1, 2, 3]);
  });

  it('当所有元素都满足条件时应该返回空数组', () => {
    const array = [1, 2, 3] as const;
    expect(dropWhile(value => value > 0, array)).toEqual([]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(dropWhile(value => value > 0, array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    dropWhile(value => value < 3, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const dropWhileLessThan4 = dropWhile(value => (value as number) < 4);
    expect(dropWhileLessThan4(array)).toEqual([4, 5]);
  });
});
