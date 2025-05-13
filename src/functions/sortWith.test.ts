import { describe, it, expect } from 'vitest';
import { sortWith } from './sortWith';

describe('sortWith', () => {
  it('应该使用自定义比较函数对数组进行排序', () => {
    const array = [3, 1, 4, 1, 5, 9, 2, 6] as const;
    const comparator = (a: number, b: number) => a - b;
    expect(sortWith(comparator, array)).toEqual([1, 1, 2, 3, 4, 5, 6, 9]);
  });

  it('应该支持降序排序', () => {
    const array = [3, 1, 4, 1, 5, 9, 2, 6] as const;
    const comparator = (a: number, b: number) => b - a;
    expect(sortWith(comparator, array)).toEqual([9, 6, 5, 4, 3, 2, 1, 1]);
  });

  it('应该支持对象数组的复杂排序', () => {
    const array = [
      { name: 'Bob', age: 30, score: 85 },
      { name: 'Alice', age: 25, score: 90 },
      { name: 'Charlie', age: 35, score: 80 },
    ] as const;
    const comparator = (a: (typeof array)[number], b: (typeof array)[number]) => {
      if (a.score !== b.score) return b.score - a.score;
      if (a.age !== b.age) return a.age - b.age;
      return a.name.localeCompare(b.name);
    };
    expect(sortWith(comparator, array)).toEqual([
      { name: 'Alice', age: 25, score: 90 },
      { name: 'Bob', age: 30, score: 85 },
      { name: 'Charlie', age: 35, score: 80 },
    ]);
  });

  it('当数组只有一个元素时应该返回原数组', () => {
    const array = [1] as const;
    const comparator = (a: number, b: number) => a - b;
    expect(sortWith(comparator, array)).toEqual([1]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    const comparator = (a: number, b: number) => a - b;
    expect(sortWith(comparator, array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [3, 1, 4, 1, 5] as const;
    const comparator = (a: number, b: number) => a - b;
    sortWith(comparator, array);
    expect(array).toEqual([3, 1, 4, 1, 5]);
  });

  it('应该支持柯里化调用', () => {
    const array = [3, 1, 4, 1, 5] as const;
    const comparator = (a: number, b: number) => a - b;
    const sortWithComparator = sortWith(comparator);
    expect(sortWithComparator(array)).toEqual([1, 1, 3, 4, 5]);
  });
});
