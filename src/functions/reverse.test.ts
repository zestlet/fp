import { describe, it, expect } from 'vitest';
import { reverse } from './reverse';

describe('reverse', () => {
  it('应该反转数组', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(reverse(array)).toEqual([5, 4, 3, 2, 1]);
  });

  it('当数组只有一个元素时应该返回原数组', () => {
    const array = [1] as const;
    expect(reverse(array)).toEqual([1]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(reverse(array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    reverse(array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3] as const;
    expect(reverse(array)).toEqual([3, 2, 1]);
  });
});
