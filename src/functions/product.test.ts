import { describe, it, expect } from 'vitest';
import { product } from './product';

describe('product', () => {
  it('应该正确计算数组的乘积', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(product(array)).toBe(120);
  });

  it('当数组为空时应该返回NaN', () => {
    const array = [] as const;
    expect(product(array)).toBeNaN();
  });

  it('当数组只有一个元素时应该返回该元素', () => {
    const array = [5] as const;
    expect(product(array)).toBe(5);
  });

  it('当数组包含负数时应该正确计算', () => {
    const array = [-1, 2, -3, 4] as const;
    expect(product(array)).toBe(24);
  });

  it('当数组包含0时应该返回0', () => {
    const array = [1, 2, 0, 4, 5] as const;
    expect(product(array)).toBe(0);
  });
});
