import { describe, it, expect } from 'vitest';
import { filter } from './filter';

describe('filter', () => {
  // 基础用法测试
  it('should filter array elements based on predicate', () => {
    const array = [1, 2, 3, 4, 5];
    const isEven = (x: number) => x % 2 === 0;
    expect(filter(isEven, array)).toEqual([2, 4]);
  });

  // 柯里化测试
  it('should support currying', () => {
    const array = [1, 2, 3, 4, 5];
    const isGreaterThan3 = (x: number) => x > 3;
    const filterGreaterThan3 = filter(isGreaterThan3);
    expect(filterGreaterThan3(array)).toEqual([4, 5]);
  });

  // 空数组测试
  it('should return empty array for empty input', () => {
    const array: number[] = [];
    const predicate = (x: number) => x > 0;
    expect(filter(predicate, array)).toEqual([]);
  });

  // 类型安全测试
  it('should maintain type safety with different array types', () => {
    const stringArray = ['a', 'b', 'c'];
    const numberArray = [1, 2, 3];

    const stringPredicate = (x: string) => x.length > 1;
    const numberPredicate = (x: number) => x > 2;

    expect(filter(stringPredicate, stringArray)).toEqual([]);
    expect(filter(numberPredicate, numberArray)).toEqual([3]);
  });

  // 复杂对象测试
  it('should work with complex objects', () => {
    interface User {
      id: number;
      name: string;
      age: number;
    }

    const users: User[] = [
      { id: 1, name: 'Alice', age: 20 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 25 },
    ];

    const isAdult = (user: User) => user.age >= 18;
    const hasLongName = (user: User) => user.name.length > 4;

    expect(filter(isAdult, users)).toEqual(users);
    expect(filter(hasLongName, users)).toEqual([
      { id: 1, name: 'Alice', age: 20 },
      { id: 3, name: 'Charlie', age: 25 },
    ]);
  });

  // 边界情况测试
  it('should handle edge cases', () => {
    const array = [0, 1, 2, 3];

    // 所有元素都满足条件
    expect(filter(() => true, array)).toEqual(array);

    // 没有元素满足条件
    expect(filter(() => false, array)).toEqual([]);

    // 包含null和undefined的数组
    const mixedArray = [1, null, 2, undefined, 3];
    const isNotNull = (x: number | null | undefined): x is number => x != null;
    expect(filter(isNotNull, mixedArray)).toEqual([1, 2, 3]);
  });
});
