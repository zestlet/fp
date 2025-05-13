import { describe, it, expect } from 'vitest';
import { last } from './last';

describe('last', () => {
  it('应该返回数组的最后一个元素', () => {
    const array = [1, 2, 3] as const;
    expect(last(array)).toBe(3);
  });

  it('当数组为空时应该返回undefined', () => {
    const array = [] as const;
    expect(last(array)).toBeUndefined();
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    last(array);
    expect(array).toEqual([1, 2, 3]);
  });
});
