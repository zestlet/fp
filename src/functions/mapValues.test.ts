import { describe, it, expect } from 'vitest';
import { mapValues } from './mapValues';

describe('mapValues', () => {
  it('应该转换对象的值', () => {
    const obj = { name: 'John', age: 30 };
    expect(mapValues(value => value.toString(), obj)).toEqual({
      name: 'John',
      age: '30',
    });
  });

  it('应该支持柯里化调用', () => {
    const obj = { name: 'John', age: 30 };
    const toString = mapValues(value => (value as string).toString());
    expect(toString(obj)).toEqual({
      name: 'John',
      age: '30',
    });
  });

  it('应该支持使用键和值进行转换', () => {
    const obj = { name: 'John', age: 30 };
    expect(mapValues((value, key) => `${key}: ${value}`, obj)).toEqual({
      name: 'name: John',
      age: 'age: 30',
    });
  });

  it('应该支持不同类型的值', () => {
    const obj = {
      str: 'string',
      num: 123,
      bool: true,
      arr: [1, 2, 3],
      obj: { x: 1 },
      fn: () => {},
      sym: Symbol('test'),
    };
    expect(mapValues(value => typeof value, obj)).toEqual({
      arr: 'object',
      bool: 'boolean',
      fn: 'function',
      num: 'number',
      obj: 'object',
      str: 'string',
      sym: 'symbol',
    });
  });

  it('应该保持原始对象的属性顺序', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = mapValues(value => value * 2, obj);
    expect(Object.keys(result)).toEqual(['a', 'b', 'c', 'd']);
    expect(result).toEqual({ a: 2, b: 4, c: 6, d: 8 });
  });

  it('应该正确处理空对象', () => {
    const obj = {};
    expect(mapValues(value => value, obj)).toEqual({});
  });

  it('应该正确处理嵌套对象', () => {
    const obj = {
      user: { name: 'John', age: 30 },
      settings: { theme: 'dark', language: 'en' },
    };
    expect(mapValues(value => Object.keys(value).length, obj)).toEqual({
      user: 2,
      settings: 2,
    });
  });
});
