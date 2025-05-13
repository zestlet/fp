import { describe, it, expect } from 'vitest';
import { mapKeys } from './mapKeys';

describe('mapKeys', () => {
  it('应该转换对象的键', () => {
    const obj = { name: 'John', age: 30 };
    expect(mapKeys(key => `user_${key}`, obj)).toEqual({
      user_name: 'John',
      user_age: 30,
    });
  });

  it('应该支持柯里化调用', () => {
    const obj = { name: 'John', age: 30 };
    const toUpperCase = mapKeys(key => (key as string).toUpperCase());
    expect(toUpperCase(obj)).toEqual({
      NAME: 'John',
      AGE: 30,
    });
  });

  it('应该支持不同类型的键和值', () => {
    const obj = {
      str: 'string',
      num: 123,
      bool: true,
      arr: [1, 2, 3],
      obj: { x: 1 },
      fn: () => {},
      sym: Symbol('test'),
    };
    expect(mapKeys(key => `prefix_${key}`, obj)).toEqual({
      prefix_str: 'string',
      prefix_num: 123,
      prefix_bool: true,
      prefix_arr: [1, 2, 3],
      prefix_obj: { x: 1 },
      prefix_fn: expect.any(Function),
      prefix_sym: expect.any(Symbol),
    });
  });

  it('应该保持原始对象的属性顺序', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = mapKeys(key => (key as string).toUpperCase(), obj);
    expect(Object.keys(result)).toEqual(['A', 'B', 'C', 'D']);
  });

  it('应该正确处理空对象', () => {
    const obj = {};
    expect(mapKeys(key => key, obj)).toEqual({});
  });

  it('应该正确处理数字键', () => {
    const obj = { 1: 'one', 2: 'two' };
    expect(mapKeys(key => `num_${key}`, obj)).toEqual({
      num_1: 'one',
      num_2: 'two',
    });
  });

  it('应该正确处理Symbol键', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const obj = { [sym1]: 'value1', [sym2]: 'value2' };
    const result = mapKeys(key => key, obj);
    expect(result[sym1]).not.toBe('value1');
    expect(result[sym2]).not.toBe('value2');
  });
});
