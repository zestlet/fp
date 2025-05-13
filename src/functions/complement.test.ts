import { describe, expect, it } from 'vitest';
import { complement } from './complement';

describe('complement', () => {
  it('应该返回原函数的逻辑补', () => {
    const isEven = (n: number) => n % 2 === 0;
    const isOdd = complement(isEven);
    expect(isEven(2)).toBe(true);
    expect(isOdd(2)).toBe(false);
    expect(isEven(3)).toBe(false);
    expect(isOdd(3)).toBe(true);
  });

  it('应该正确处理多个参数', () => {
    const isGreaterThan = (a: number, b: number) => a > b;
    const isLessThanOrEqual = complement(isGreaterThan);
    expect(isGreaterThan(5, 3)).toBe(true);
    expect(isLessThanOrEqual(5, 3)).toBe(false);
    expect(isGreaterThan(3, 5)).toBe(false);
    expect(isLessThanOrEqual(3, 5)).toBe(true);
  });

  it('应该正确处理对象断言', () => {
    const hasProperty = (obj: any, prop: string) => prop in obj;
    const lacksProperty = complement(hasProperty);
    const obj = { a: 1 };
    expect(hasProperty(obj, 'a')).toBe(true);
    expect(lacksProperty(obj, 'a')).toBe(false);
    expect(hasProperty(obj, 'b')).toBe(false);
    expect(lacksProperty(obj, 'b')).toBe(true);
  });

  it('应该正确处理数组断言', () => {
    const includes = (arr: number[], val: number) => arr.includes(val);
    const excludes = complement(includes);
    const arr = [1, 2, 3];
    expect(includes(arr, 2)).toBe(true);
    expect(excludes(arr, 2)).toBe(false);
    expect(includes(arr, 4)).toBe(false);
    expect(excludes(arr, 4)).toBe(true);
  });

  it('应该正确处理 null 和 undefined', () => {
    const isNull = (x: any) => x === null;
    const isNotNull = complement(isNull);
    expect(isNull(null)).toBe(true);
    expect(isNotNull(null)).toBe(false);
    expect(isNull(undefined)).toBe(false);
    expect(isNotNull(undefined)).toBe(true);
  });
});
