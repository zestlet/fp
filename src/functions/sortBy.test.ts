import { describe, it, expect } from 'vitest';
import { sortBy } from './sortBy';

describe('sortBy', () => {
  it('应该根据指定的函数对数组进行排序', () => {
    const array = [
      { name: 'Bob', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 35 },
    ] as const;
    expect(sortBy(item => item.age, array)).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 },
    ]);
  });

  it('应该根据字符串属性进行排序', () => {
    const array = [
      { name: 'Bob', age: 30 },
      { name: 'Alice', age: 25 },
      { name: 'Charlie', age: 35 },
    ] as const;
    expect(sortBy(item => item.name, array)).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 },
    ]);
  });

  it('当数组只有一个元素时应该返回原数组', () => {
    const array = [{ name: 'Bob', age: 30 }] as const;
    expect(sortBy(item => item.age, array)).toEqual([{ name: 'Bob', age: 30 }]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(sortBy((item: { age: number }) => item.age, array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [
      { name: 'Bob', age: 30 },
      { name: 'Alice', age: 25 },
    ] as const;
    sortBy(item => item.age, array);
    expect(array).toEqual([
      { name: 'Bob', age: 30 },
      { name: 'Alice', age: 25 },
    ]);
  });

  it('应该支持柯里化调用', () => {
    const array = [
      { name: 'Bob', age: 30 },
      { name: 'Alice', age: 25 },
    ] as const;
    const sortByAge = sortBy((item: { age: number }) => item.age);
    expect(sortByAge(array)).toEqual([
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
    ]);
  });
});
