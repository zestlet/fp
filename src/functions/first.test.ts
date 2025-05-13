import { describe, it, expect } from 'vitest';
import { first } from './first';

describe('first', () => {
  it('应该返回数组的第一个元素', () => {
    const array = [1, 2, 3] as const;
    expect(first(array)).toBe(1);
  });

  it('当数组为空时应该返回undefined', () => {
    const array = [] as const;
    expect(first(array)).toBeUndefined();
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    first(array);
    expect(array).toEqual([1, 2, 3]);
  });
});
