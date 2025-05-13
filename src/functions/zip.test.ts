import { describe, it, expect } from 'vitest';
import { zip } from './zip';

describe('zip', () => {
  it('应该将两个数组的元素一一对应组合', () => {
    const array1 = [1, 2, 3];
    const array2 = ['a', 'b', 'c'];
    expect(zip(array2, array1)).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });

  it('应该处理不同长度的数组', () => {
    const array1 = [1, 2, 3, 4];
    const array2 = ['a', 'b'];
    expect(zip(array2, array1)).toEqual([
      [1, 'a'],
      [2, 'b'],
    ]);
  });

  it('应该处理空数组', () => {
    const array1: number[] = [];
    const array2: string[] = [];
    expect(zip(array2, array1)).toEqual([]);
  });

  it('应该处理对象数组', () => {
    type Item1 = { id: number };
    type Item2 = { name: string };
    const array1: Item1[] = [{ id: 1 }, { id: 2 }];
    const array2: Item2[] = [{ name: 'a' }, { name: 'b' }];
    expect(zip(array2, array1)).toEqual([
      [{ id: 1 }, { name: 'a' }],
      [{ id: 2 }, { name: 'b' }],
    ]);
  });

  it('应该支持柯里化调用', () => {
    const array1 = [1, 2, 3];
    const array2 = ['a', 'b', 'c'];
    const zipWithArray1 = zip(array2);
    expect(zipWithArray1(array1)).toEqual([
      [1, 'a'],
      [2, 'b'],
      [3, 'c'],
    ]);
  });
});
