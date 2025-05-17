import { describe, it, expect } from 'vitest';
import { splitBy } from './splitBy';

describe('partition', () => {
  it('应该根据断言函数将数组分成两部分', () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (x: number) => x % 2 === 0;
    expect(splitBy(predicate, array)).toEqual([
      [2, 4],
      [1, 3, 5],
    ]);
  });

  it('当数组为空时应该返回两个空数组', () => {
    const array: number[] = [];
    const predicate = (x: number) => x % 2 === 0;
    expect(splitBy(predicate, array)).toEqual([[], []]);
  });

  it('当所有元素都满足条件时应该返回完整数组和空数组', () => {
    const array = [2, 4, 6, 8];
    const predicate = (x: number) => x % 2 === 0;
    expect(splitBy(predicate, array)).toEqual([[2, 4, 6, 8], []]);
  });

  it('当没有元素满足条件时应该返回空数组和完整数组', () => {
    const array = [1, 3, 5, 7];
    const predicate = (x: number) => x % 2 === 0;
    expect(splitBy(predicate, array)).toEqual([[], [1, 3, 5, 7]]);
  });

  it('应该支持对象数组', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const predicate = (item: { x: number }) => item.x % 2 === 0;
    expect(splitBy(predicate, array)).toEqual([[{ x: 2 }], [{ x: 1 }, { x: 3 }]]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (x: number) => x % 2 === 0;
    const partitionEven = splitBy(predicate);
    expect(partitionEven(array)).toEqual([
      [2, 4],
      [1, 3, 5],
    ]);
  });
});
