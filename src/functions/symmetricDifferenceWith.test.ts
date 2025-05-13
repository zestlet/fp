import { describe, it, expect } from 'vitest';
import { symmetricDifferenceWith } from './symmetricDifferenceWith';

interface TestItem {
  x: number;
  y: number;
}

describe('symmetricDifferenceWith', () => {
  it('应该根据比较函数返回两个数组的对称差集', () => {
    const array1 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array2 = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    expect(symmetricDifferenceWith(comparator, array2, array1)).toEqual([
      { x: 2, y: 1 },
      { x: 3, y: 4 },
    ]);
  });

  it('当第一个数组为空时应该返回第二个数组的副本', () => {
    const array1: TestItem[] = [];
    const array2 = [{ x: 1, y: 2 }];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    expect(symmetricDifferenceWith(comparator, array2, array1)).toEqual([{ x: 1, y: 2 }]);
  });

  it('当第二个数组为空时应该返回第一个数组的副本', () => {
    const array1 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array2: TestItem[] = [];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    expect(symmetricDifferenceWith(comparator, array2, array1)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ]);
  });

  it('当两个数组都为空时应该返回空数组', () => {
    const array1: TestItem[] = [];
    const array2: TestItem[] = [];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    expect(symmetricDifferenceWith(comparator, array2, array1)).toEqual([]);
  });

  it('应该支持不同的比较函数', () => {
    const array1 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array2 = [
      { x: 1, y: 3 },
      { x: 2, y: 4 },
    ];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x;
    expect(symmetricDifferenceWith(comparator, array2, array1)).toEqual([]);
  });

  it('应该支持柯里化调用', () => {
    const array1 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array2 = [
      { x: 1, y: 2 },
      { x: 3, y: 4 },
    ];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    const getSymmetricDifference = symmetricDifferenceWith(comparator);
    expect(getSymmetricDifference(array2, array1)).toEqual([
      { x: 2, y: 1 },
      { x: 3, y: 4 },
    ]);
  });
});
