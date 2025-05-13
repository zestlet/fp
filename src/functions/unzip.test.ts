import { describe, it, expect } from 'vitest';
import { unzip } from './unzip';

describe('unzip', () => {
  it('应该将元组数组转换为多个数组', () => {
    const array = [
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ] as const;
    expect(unzip(array)).toEqual([
      [1, 2, 3],
      ['a', 'b', 'c'],
    ]);
  });

  it('应该处理空数组', () => {
    const array: readonly (readonly [number, string])[] = [];
    expect(unzip(array)).toEqual([]);
  });

  it('应该处理不同长度的元组', () => {
    const array = [
      [1, 'a', true],
      [2, 'b', false],
      [3, 'c', true],
    ] as const;
    expect(unzip(array)).toEqual([
      [1, 2, 3],
      ['a', 'b', 'c'],
      [true, false, true],
    ]);
  });

  it('应该处理对象元组', () => {
    type Item1 = { id: number };
    type Item2 = { name: string };
    const array = [
      [{ id: 1 }, { name: 'a' }],
      [{ id: 2 }, { name: 'b' }],
    ] as const;
    expect(unzip(array)).toEqual([
      [{ id: 1 }, { id: 2 }],
      [{ name: 'a' }, { name: 'b' }],
    ]);
  });
});
