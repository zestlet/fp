import { describe, it, expect } from 'vitest';
import { splitWhen } from './splitWhen';

describe('splitWhen', () => {
  it('应该在断言首次为true时分割数组', () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (x: number) => x > 3;
    expect(splitWhen(predicate, array)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });

  it('当数组为空时应该返回两个空数组', () => {
    const array: number[] = [];
    const predicate = (x: number) => x > 3;
    expect(splitWhen(predicate, array)).toEqual([[], []]);
  });

  it('当第一个元素就满足条件时应该返回空数组和完整数组', () => {
    const array = [4, 1, 2, 3];
    const predicate = (x: number) => x > 3;
    expect(splitWhen(predicate, array)).toEqual([[], [4, 1, 2, 3]]);
  });

  it('当没有元素满足条件时应该返回完整数组和空数组', () => {
    const array = [1, 2, 3];
    const predicate = (x: number) => x > 3;
    expect(splitWhen(predicate, array)).toEqual([[1, 2, 3], []]);
  });

  it('应该支持对象数组', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const predicate = (item: { x: number }) => item.x > 2;
    expect(splitWhen(predicate, array)).toEqual([[{ x: 1 }, { x: 2 }], [{ x: 3 }]]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5];
    const predicate = (x: number) => x > 3;
    const splitWhenGreaterThan3 = splitWhen(predicate);
    expect(splitWhenGreaterThan3(array)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });
});
