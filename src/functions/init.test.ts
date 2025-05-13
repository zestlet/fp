import { describe, it, expect } from 'vitest';
import { init } from './init';

describe('init', () => {
  it('应该返回除最后一个元素外的所有元素', () => {
    const array = [1, 2, 3, 4] as const;
    expect(init(array)).toEqual([1, 2, 3]);
  });

  it('当数组只有一个元素时应该返回空数组', () => {
    const array = [1] as const;
    expect(init(array)).toEqual([]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(init(array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    init(array);
    expect(array).toEqual([1, 2, 3]);
  });
});
