import { describe, it, expect } from 'vitest';
import { flatten } from './flatten';

describe('flatten', () => {
  it('应该将嵌套数组扁平化指定深度', () => {
    const array = [1, [2, 3], [4, [5, 6]]];
    expect(flatten(1, array)).toEqual([1, 2, 3, 4, [5, 6]]);
    expect(flatten(2, array)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('应该处理空数组', () => {
    const array: number[] = [];
    expect(flatten(1, array)).toEqual([]);
  });

  it('应该处理没有嵌套的数组', () => {
    const array = [1, 2, 3, 4, 5];
    expect(flatten(1, array)).toEqual([1, 2, 3, 4, 5]);
  });

  it('应该处理对象数组', () => {
    type Item = { id: number; name?: string };
    const array: (Item | Item[])[] = [{ id: 1 }, [{ id: 2 }, { id: 3 }], [{ id: 4, name: 'test' }]];
    expect(flatten(1, array)).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4, name: 'test' }]);
  });

  it('应该支持无限深度扁平化', () => {
    const array = [1, [2, [3, [4, [5]]]]];
    expect(flatten(Infinity, array)).toEqual([1, 2, 3, 4, 5]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, [2, 3], [4, [5, 6]]];
    const flatten1 = flatten(1);
    expect(flatten1(array)).toEqual([1, 2, 3, 4, [5, 6]]);
  });
});
