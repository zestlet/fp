import { describe, it, expect } from 'vitest';
import { drop } from './drop';

describe('drop', () => {
  it('应该删除数组的前n个元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(drop(3, array)).toEqual([4, 5]);
  });

  it('当n大于数组长度时应该返回空数组', () => {
    const array = [1, 2, 3] as const;
    expect(drop(5, array)).toEqual([]);
  });

  it('当n为0时应该返回原数组', () => {
    const array = [1, 2, 3] as const;
    expect(drop(0, array)).toEqual([1, 2, 3]);
  });

  it('当n为负数时应该返回原数组', () => {
    const array = [1, 2, 3] as const;
    expect(drop(-1, array)).toEqual([1, 2, 3]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    drop(2, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const drop3 = drop(3);
    expect(drop3(array)).toEqual([4, 5]);
  });
});
