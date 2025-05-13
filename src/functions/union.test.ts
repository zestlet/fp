import { describe, it, expect } from 'vitest';
import { union } from './union';

describe('union', () => {
  it('应该返回两个数组的并集', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    expect(union(array2, array1)).toEqual([1, 2, 3, 4, 5]);
  });

  it('应该处理空数组', () => {
    const array1: number[] = [];
    const array2 = [1, 2, 3];
    expect(union(array2, array1)).toEqual([1, 2, 3]);
    expect(union(array1, array2)).toEqual([1, 2, 3]);
  });

  it('应该处理对象数组', () => {
    type Item = { id: number };
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const array1: Item[] = [obj1, obj2];
    const array2: Item[] = [obj2, obj3];
    expect(union(array2, array1)).toEqual([obj1, obj2, obj3]);
  });

  it('应该支持柯里化调用', () => {
    const array1 = [1, 2, 3];
    const array2 = [3, 4, 5];
    const unionWithArray1 = union(array2);
    expect(unionWithArray1(array1)).toEqual([1, 2, 3, 4, 5]);
  });
});
