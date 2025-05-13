import { describe, it, expect } from 'vitest';
import { differenceWith } from './differenceWith';

interface TestItem {
  x: number;
  y: number;
}

describe('differenceWith', () => {
  it('应该根据比较函数返回第一个数组中不在第二个数组中的元素', () => {
    const array2 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array1 = [{ x: 1, y: 2 }];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    expect(differenceWith(comparator, array1, array2)).toEqual([{ x: 2, y: 1 }]);
  });

  it('当第一个数组为空时应该返回空数组', () => {
    const array2: TestItem[] = [];
    const array1 = [{ x: 1, y: 2 }];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    expect(differenceWith(comparator, array1, array2)).toEqual([]);
  });

  it('当第二个数组为空时应该返回第一个数组的副本', () => {
    const array2 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array1: TestItem[] = [];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    expect(differenceWith(comparator, array1, array2)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ]);
  });

  it('当两个数组都为空时应该返回空数组', () => {
    const array2: TestItem[] = [];
    const array1: TestItem[] = [];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    expect(differenceWith(comparator, array1, array2)).toEqual([]);
  });

  it('应该支持不同的比较函数', () => {
    const array2 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array1 = [{ x: 1, y: 3 }];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x;
    expect(differenceWith(comparator, array1, array2)).toEqual([{ x: 2, y: 1 }]);
  });

  it('应该支持柯里化调用', () => {
    const array2 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array1 = [{ x: 1, y: 2 }];
    const comparator = (a: TestItem, b: TestItem) => a.x === b.x && a.y === b.y;
    const getDifference = differenceWith(comparator);
    expect(getDifference(array1, array2)).toEqual([{ x: 2, y: 1 }]);
  });
});
