import { describe, it, expect } from 'vitest';
import { symmetricDifferenceBy } from './symmetricDifferenceBy';

interface TestItem {
  x: number;
  y: number;
}

describe('symmetricDifferenceBy', () => {
  it('应该根据转换函数返回两个数组的对称差集', () => {
    const array1 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array2 = [
      { x: 1, y: 3 },
      { x: 3, y: 4 },
    ];
    const iteratee = (item: TestItem) => item.x;
    expect(symmetricDifferenceBy(iteratee, array2, array1)).toEqual([
      { x: 2, y: 1 },
      { x: 3, y: 4 },
    ]);
  });

  it('当第一个数组为空时应该返回第二个数组的副本', () => {
    const array1: TestItem[] = [];
    const array2 = [{ x: 1, y: 2 }];
    const iteratee = (item: TestItem) => item.x;
    expect(symmetricDifferenceBy(iteratee, array2, array1)).toEqual([{ x: 1, y: 2 }]);
  });

  it('当第二个数组为空时应该返回第一个数组的副本', () => {
    const array1 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array2: TestItem[] = [];
    const iteratee = (item: TestItem) => item.x;
    expect(symmetricDifferenceBy(iteratee, array2, array1)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ]);
  });

  it('当两个数组都为空时应该返回空数组', () => {
    const array1: TestItem[] = [];
    const array2: TestItem[] = [];
    const iteratee = (item: TestItem) => item.x;
    expect(symmetricDifferenceBy(iteratee, array2, array1)).toEqual([]);
  });

  it('应该支持不同的转换函数', () => {
    const array1 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array2 = [
      { x: 1, y: 3 },
      { x: 2, y: 4 },
    ];
    const iteratee = (item: TestItem) => item.y;
    expect(symmetricDifferenceBy(iteratee, array2, array1)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 3 },
      { x: 2, y: 4 },
    ]);
  });

  it('应该支持柯里化调用', () => {
    const array1 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array2 = [
      { x: 1, y: 3 },
      { x: 3, y: 4 },
    ];
    const iteratee = (item: TestItem) => item.x;
    const getSymmetricDifference = symmetricDifferenceBy(iteratee);
    expect(getSymmetricDifference(array2, array1)).toEqual([
      { x: 2, y: 1 },
      { x: 3, y: 4 },
    ]);
  });

  it('应该支持复杂对象的转换函数', () => {
    const array1 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array2 = [
      { x: 1, y: 3 },
      { x: 3, y: 4 },
    ];
    const iteratee = (item: TestItem) => `${item.x},${item.y}`;
    expect(symmetricDifferenceBy(iteratee, array2, array1)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
      { x: 1, y: 3 },
      { x: 3, y: 4 },
    ]);
  });
});
