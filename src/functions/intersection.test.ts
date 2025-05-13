import { describe, it, expect } from 'vitest';
import { intersection } from './intersection';

describe('intersection', () => {
  it('应该返回两个数组中都存在的元素', () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [3, 4, 5, 6];
    expect(intersection(array1, array2)).toEqual([3, 4]);
    expect(intersection(array2, array1)).toEqual([3, 4]);
  });

  it('应该处理空数组', () => {
    const array1: number[] = [];
    const array2 = [1, 2, 3];
    expect(intersection(array1, array2)).toEqual([]);
    expect(intersection(array2, array1)).toEqual([]);
  });

  it('应该处理对象数组', () => {
    type Item = { id: number };
    const obj1 = { id: 1 };
    const obj2 = { id: 2 };
    const obj3 = { id: 3 };
    const obj4 = { id: 4 };

    const array1: Item[] = [obj1, obj2, obj3];
    const array2: Item[] = [obj2, obj3, obj4];
    expect(intersection(array1, array2)).toEqual([obj2, obj3]);
  });

  it('应该支持柯里化调用', () => {
    const array1 = [1, 2, 3] as const;
    const array2 = [2, 3, 4] as const;
    const intersectionWithArray1 = intersection(array1);
    expect(intersectionWithArray1(array2)).toEqual([2, 3]);
  });
});
