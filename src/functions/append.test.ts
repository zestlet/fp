import { describe, it, expect } from 'vitest';
import { append } from './append';

describe('append', () => {
  it('应该在数组末尾添加元素', () => {
    const array = [1, 2, 3] as const;
    expect(append(4, array)).toEqual([1, 2, 3, 4]);
  });

  it('当数组为空时应该添加元素', () => {
    const array = [] as const;
    expect(append(1, array)).toEqual([1]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    append(4, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3] as const;
    const append4 = append(4);
    expect(append4(array)).toEqual([1, 2, 3, 4]);
  });
});
