import { describe, it, expect } from 'vitest';
import { min } from './min';

describe('min', () => {
  it('应该返回数组中的最小值', () => {
    const array = [5, 3, 1, 4, 2] as const;
    expect(min(array)).toBe(1);
  });

  it('当数组为空时应该返回undefined', () => {
    const array = [] as const;
    expect(min(array)).toBeUndefined();
  });

  it('当数组只有一个元素时应该返回该元素', () => {
    const array = [5] as const;
    expect(min(array)).toBe(5);
  });

  it('当数组包含负数时应该正确返回最小值', () => {
    const array = [-1, -5, -3, -2] as const;
    expect(min(array)).toBe(-5);
  });

  it('当数组包含重复的最小值时应该返回该值', () => {
    const array = [1, 1, 2, 3] as const;
    expect(min(array)).toBe(1);
  });
});
