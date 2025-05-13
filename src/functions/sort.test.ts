import { describe, it, expect } from 'vitest';
import { sort } from './sort';

describe('sort', () => {
  it('应该对数字数组进行排序', () => {
    const array = [3, 1, 4, 1, 5, 9, 2, 6] as const;
    expect(sort(array)).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it('应该对字符串数组进行排序', () => {
    const array = ['banana', 'apple', 'cherry', 'date'] as const;
    expect(sort(array)).toEqual(['apple', 'banana', 'cherry', 'date']);
  });

  it('当数组只有一个元素时应该返回原数组', () => {
    const array = [1] as const;
    expect(sort(array)).toEqual([1]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(sort(array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [3, 1, 4, 1, 5] as const;
    sort(array);
    expect(array).toEqual([3, 1, 4, 1, 5]);
  });

  it('应该支持柯里化调用', () => {
    const array = [3, 1, 4, 1, 5] as const;
    expect(sort(array)).toEqual([1, 1, 3, 4, 5]);
  });
});
