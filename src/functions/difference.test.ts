import { describe, it, expect } from 'vitest';
import { difference } from './difference';

describe('difference', () => {
  it('应该返回第一个数组中不在第二个数组中的元素', () => {
    const array2 = [1, 2, 3, 4];
    const array1 = [3, 4, 5, 6];
    expect(difference(array1, array2)).toEqual([1, 2]);
  });

  it('应该处理空数组', () => {
    const array2: number[] = [];
    const array1 = [1, 2, 3];
    expect(difference(array1, array2)).toEqual([]);
    expect(difference(array2, array1)).toEqual([1, 2, 3]);
  });

  it('应该处理对象数组', () => {
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const obj4 = { id: 4 };

    const array2 = [obj1, obj2, obj3];
    const array1 = [obj2, obj3, obj4];
    expect(difference(array1, array2)).toEqual([obj1]);
  });

  it('应该支持柯里化调用', () => {
    const array2 = [1, 2, 3];
    const array1 = [2, 3, 4];
    const differenceWithArray1 = difference(array1);
    expect(differenceWithArray1(array2)).toEqual([1]);
  });
});
