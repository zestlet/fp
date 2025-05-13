import { describe, expect, it } from 'vitest';
import { invertMulti } from './invertMulti';

describe('invertMulti', () => {
  it('应该正确交换对象的键值对，并将重复值的键收集到数组中', () => {
    const obj = { a: 1, b: 2, c: 1 };
    const result = invertMulti(obj);
    expect(result).toEqual({ '1': ['a', 'c'], '2': ['b'] });
    expect(result).not.toBe(obj);
  });

  it('应该支持数字键', () => {
    const obj = { 1: 'a', 2: 'b', 3: 'a' };
    const result = invertMulti(obj);
    expect(result).toEqual({ a: ['1', '3'], b: ['2'] });
  });

  it('应该处理空对象', () => {
    const obj = {};
    const result = invertMulti(obj);
    expect(result).toEqual({});
  });

  it('应该保持不可变性', () => {
    const obj = { a: 1, b: 2 };
    const result = invertMulti(obj);
    expect(result).not.toBe(obj);
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  it('应该正确处理所有值都不同的情况', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = invertMulti(obj);
    expect(result).toEqual({ '1': ['a'], '2': ['b'], '3': ['c'] });
  });
});
