import { describe, it, expect } from 'vitest';
import { dropRepeats } from './dropRepeats';

describe('dropRepeats', () => {
  it('应该移除数组中连续重复的元素', () => {
    const array = [1, 1, 2, 2, 3, 3, 3, 4];
    expect(dropRepeats(array)).toEqual([1, 2, 3, 4]);
  });

  it('应该保留非连续的重复元素', () => {
    const array = [1, 2, 1, 2, 1];
    expect(dropRepeats(array)).toEqual([1, 2, 1, 2, 1]);
  });

  it('应该支持不同类型的数组', () => {
    const array = [1, '1', 1, true, true, { x: 1 }, { x: 1 }];
    expect(dropRepeats(array)).toEqual([1, '1', 1, true, { x: 1 }, { x: 1 }]);
  });

  it('应该支持空数组', () => {
    const array: number[] = [];
    expect(dropRepeats(array)).toEqual([]);
  });

  it('应该支持只有一个元素的数组', () => {
    const array = [1];
    expect(dropRepeats(array)).toEqual([1]);
  });

  it('应该支持对象数组', () => {
    const obj1 = { id: 1, name: 'Alice' };
    const obj2 = { id: 1, name: 'Alice' };

    const array = [obj1, obj2];
    expect(dropRepeats(array)).toEqual([obj1, obj2]);
  });
});
