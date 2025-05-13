import { describe, it, expect } from 'vitest';
import { median } from './median';

describe('median', () => {
  it('当数组长度为奇数时应该返回中间值', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(median(array)).toBe(3);
  });

  it('当数组长度为偶数时应该返回中间两个数的平均值', () => {
    const array = [1, 2, 3, 4] as const;
    expect(median(array)).toBe(2.5);
  });

  it('当数组为空时应该返回NaN', () => {
    const array = [] as const;
    expect(median(array)).toBeNaN();
  });

  it('当数组只有一个元素时应该返回该元素', () => {
    const array = [5] as const;
    expect(median(array)).toBe(5);
  });

  it('当数组包含负数时应该正确计算', () => {
    const array = [-1, 2, -3, 4] as const;
    expect(median(array)).toBe(0.5);
  });

  it('当数组包含重复值时应该正确计算', () => {
    const array = [1, 1, 2, 2, 3] as const;
    expect(median(array)).toBe(2);
  });

  it('当数组未排序时应该正确计算', () => {
    const array = [5, 2, 1, 4, 3] as const;
    expect(median(array)).toBe(3);
  });
});
