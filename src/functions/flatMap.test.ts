import { describe, it, expect } from 'vitest';
import { flatMap } from './flatMap';

describe('flatMap', () => {
  it('应该支持两个参数调用', () => {
    const numbers = [1, 2, 3] as const;
    const result = flatMap(n => [n, n * 2], numbers);
    expect(result).toEqual([1, 2, 2, 4, 3, 6]);
  });

  it('应该支持函数式调用', () => {
    const numbers = [1, 2, 3] as const;
    const doubleAndFlatten = flatMap((n: number) => [n, n * 2]);
    const result = doubleAndFlatten(numbers);
    expect(result).toEqual([1, 2, 2, 4, 3, 6]);
  });

  it('应该处理空数组', () => {
    const result = flatMap((n: number, i) => [n, n * 2], []);
    expect(result).toEqual([]);
  });

  it('应该处理返回单个值的回调', () => {
    const numbers = [1, 2, 3] as const;
    const result = flatMap(n => n * 2, numbers);
    expect(result).toEqual([2, 4, 6]);
  });

  it('应该处理返回数组的回调', () => {
    const numbers = [1, 2, 3] as const;
    const result = flatMap((n: number) => [n, n * 2, n * 3], numbers);
    expect(result).toEqual([1, 2, 3, 2, 4, 6, 3, 6, 9]);
  });
});
