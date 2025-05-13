import { describe, it, expect } from 'vitest';
import { take } from './take';

describe('take', () => {
  it('应该获取数组的前n个元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(take(3, array)).toEqual([1, 2, 3]);
  });

  it('当n大于数组长度时应该返回整个数组', () => {
    const array = [1, 2, 3] as const;
    expect(take(5, array)).toEqual([1, 2, 3]);
  });

  it('当n为0时应该返回空数组', () => {
    const array = [1, 2, 3] as const;
    expect(take(0, array)).toEqual([]);
  });

  it('当n为负数时应该返回空数组', () => {
    const array = [1, 2, 3] as const;
    expect(take(-1, array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    take(2, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const take3 = take(3);
    expect(take3(array)).toEqual([1, 2, 3]);
  });
});
