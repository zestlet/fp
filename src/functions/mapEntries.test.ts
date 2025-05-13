import { describe, it, expect } from 'vitest';
import { mapEntries } from './mapEntries';

describe('mapEntries', () => {
  it('应该转换对象的键值对', () => {
    const obj = { name: 'John', age: 30 } as const;
    expect(mapEntries(([key, value]) => [(key as string).toUpperCase(), value], obj)).toEqual({
      NAME: 'John',
      AGE: 30,
    });
  });

  it('应该支持柯里化调用', () => {
    const obj = { name: 'John', age: 30 } as const;
    const toUpperCase = mapEntries(<V>(item: readonly [string, V]): readonly [string, V] => [item[0].toUpperCase(), item[1]]);

    expect(toUpperCase(obj)).toEqual({
      NAME: 'John',
      AGE: 30,
    });
  });

  it('应该支持同时转换键和值', () => {
    const obj = { name: 'John', age: 30 };
    expect(mapEntries(([key, value]) => [(key as string).toUpperCase(), value.toString()], obj)).toEqual({
      NAME: 'John',
      AGE: '30',
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
    expect(mapEntries(([key, value]) => [`${key}_type`, typeof value], obj)).toEqual({
      str_type: 'string',
      num_type: 'number',
      bool_type: 'boolean',
      arr_type: 'object',
      obj_type: 'object',
      fn_type: 'function',
      sym_type: 'symbol',
    });
  });

  it('应该保持原始对象的属性顺序', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = mapEntries(([key, value]) => [key, value * 2], obj);
    expect(Object.keys(result)).toEqual(['a', 'b', 'c', 'd']);
    expect(result).toEqual({ a: 2, b: 4, c: 6, d: 8 });
  });

  it('应该正确处理空对象', () => {
    const obj = {};
    expect(mapEntries(([key, value]) => [key, value], obj)).toEqual({});
  });

  it('应该正确处理嵌套对象', () => {
    const obj = {
      user: { name: 'John', age: 30 },
      settings: { theme: 'dark', language: 'en' },
    };
    expect(mapEntries(([key, value]) => [`${key}_count`, Object.keys(value).length], obj)).toEqual({
      user_count: 2,
      settings_count: 2,
    });
  });
});
