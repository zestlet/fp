import { describe, it, expect } from 'vitest';
import { mean } from './mean';

describe('mean', () => {
  it('应该正确计算数组的平均值', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(mean(array)).toBe(3);
  });

  it('当数组为空时应该返回0', () => {
    const array = [] as const;
    expect(mean(array)).toBe(0);
  });

  it('当数组只有一个元素时应该返回该元素', () => {
    const array = [5] as const;
    expect(mean(array)).toBe(5);
  });

  it('当数组包含负数时应该正确计算', () => {
    const array = [-1, 2, -3, 4] as const;
    expect(mean(array)).toBe(0.5);
  });

  it('当数组包含小数时应该正确计算', () => {
    const array = [1.5, 2.5, 3.5] as const;
    expect(mean(array)).toBe(2.5);
  });
});
