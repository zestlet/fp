import { describe, it, expect } from 'vitest';
import { symmetricDifference } from './symmetricDifference';

describe('symmetricDifference', () => {
  it('应该返回两个数组的对称差集', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    expect(symmetricDifference(array2, array1)).toEqual([1, 2, 4, 5]);
  });

  it('应该处理空数组', () => {
    const array1: number[] = [];
    const array2 = [1, 2, 3];
    expect(symmetricDifference(array2, array1)).toEqual([1, 2, 3]);
    expect(symmetricDifference(array2, array1)).toEqual([1, 2, 3]);
  });

  it('应该处理对象数组', () => {
    type Item = { id: number };
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const array1: Item[] = [obj1, obj2];
    const array2: Item[] = [obj2, obj3];
    expect(symmetricDifference(array2, array1)).toEqual([obj1, obj3]);
  });

  it('应该支持柯里化调用', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    const symmetricDifferenceWithArray1 = symmetricDifference(array2);
    expect(symmetricDifferenceWithArray1(array1)).toEqual([1, 2, 4, 5]);
  });
});
