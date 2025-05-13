import { describe, it, expect } from 'vitest';
import { prepend } from './prepend';

describe('prepend', () => {
  it('应该在数组开头添加元素', () => {
    const array = [1, 2, 3] as const;
    expect(prepend(0, array)).toEqual([0, 1, 2, 3]);
  });

  it('当数组为空时应该添加元素', () => {
    const array = [] as const;
    expect(prepend(1, array)).toEqual([1]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    prepend(0, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3] as const;
    const prepend0 = prepend(0);
    expect(prepend0(array)).toEqual([0, 1, 2, 3]);
  });
});
