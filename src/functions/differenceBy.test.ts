import { describe, it, expect } from 'vitest';
import { differenceBy } from './differenceBy';

interface TestItem {
  x: number;
  y: number;
}

describe('differenceBy', () => {
  it('应该根据转换函数返回第一个数组中不在第二个数组中的元素', () => {
    const array2 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array1 = [{ x: 1, y: 3 }];
    const iteratee = (item: TestItem) => item.x;
    expect(differenceBy(iteratee, array1, array2)).toEqual([{ x: 2, y: 1 }]);
  });

  it('当第一个数组为空时应该返回空数组', () => {
    const array2: TestItem[] = [];
    const array1 = [{ x: 1, y: 2 }];
    const iteratee = (item: TestItem) => item.x;
    expect(differenceBy(iteratee, array1, array2)).toEqual([]);
  });

  it('当第二个数组为空时应该返回第一个数组的副本', () => {
    const array2 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array1: TestItem[] = [];
    const iteratee = (item: TestItem) => item.x;
    expect(differenceBy(iteratee, array1, array2)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ]);
  });

  it('当两个数组都为空时应该返回空数组', () => {
    const array2: TestItem[] = [];
    const array1: TestItem[] = [];
    const iteratee = (item: TestItem) => item.x;
    expect(differenceBy(iteratee, array1, array2)).toEqual([]);
  });

  it('应该支持不同的转换函数', () => {
    const array2 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array1 = [{ x: 1, y: 3 }];
    const iteratee = (item: TestItem) => item.y;
    expect(differenceBy(iteratee, array1, array2)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ]);
  });

  it('应该支持柯里化调用', () => {
    const array2 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array1 = [{ x: 1, y: 3 }];
    const iteratee = (item: TestItem) => item.x;
    const getDifference = differenceBy(iteratee);
    expect(getDifference(array1, array2)).toEqual([{ x: 2, y: 1 }]);
  });

  it('应该支持复杂对象的转换函数', () => {
    const array2 = [
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ];
    const array1 = [{ x: 1, y: 3 }];
    const iteratee = (item: TestItem) => `${item.x},${item.y}`;
    expect(differenceBy(iteratee, array1, array2)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 1 },
    ]);
  });
});
