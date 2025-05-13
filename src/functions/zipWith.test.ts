import { describe, it, expect } from 'vitest';
import { zipWith } from './zipWith';

describe('zipWith', () => {
  it('应该将两个数组的元素一一对应组合并应用转换函数', () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    expect(zipWith((a, b) => a + b, array1, array2)).toEqual([5, 7, 9]);
  });

  it('应该处理不同长度的数组', () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [4, 5];
    expect(zipWith((a, b) => a + b, array1, array2)).toEqual([5, 7]);
  });

  it('应该处理空数组', () => {
    const array1: number[] = [];
    const array2: number[] = [];
    expect(zipWith((a, b) => a + b, array1, array2)).toEqual([]);
  });

  it('应该处理对象数组', () => {
    type Item1 = { id: number };
    type Item2 = { name: string };
    const array1: Item1[] = [{ id: 1 }, { id: 2 }];
    const array2: Item2[] = [{ name: 'a' }, { name: 'b' }];
    expect(zipWith((a, b) => ({ ...a, ...b }), array1, array2)).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ]);
  });

  it('应该支持柯里化调用', () => {
    const array1 = [1, 2, 3];
    const array2 = [4, 5, 6];
    const add = (a: number, b: number) => a + b;
    const zipWithAdd = zipWith(add);
    expect(zipWithAdd(array1, array2)).toEqual([5, 7, 9]);
  });
});
