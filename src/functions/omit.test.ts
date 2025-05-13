import { describe, it, expect } from 'vitest';
import { omit } from './omit';

describe('omit', () => {
  it('应该从对象中排除指定的属性', () => {
    const obj = { name: 'John', age: 30, city: 'New York' };
    expect(omit(['age'], obj)).toEqual({ name: 'John', city: 'New York' });
  });

  it('应该支持柯里化调用', () => {
    const obj = { name: 'John', age: 30, city: 'New York' } as const;
    const omitAge = omit(['age']);
    const result = omitAge(obj);
    expect(result).toEqual({ name: 'John', city: 'New York' });
  });

  it('应该忽略不存在的属性', () => {
    const obj = { name: 'John', age: 30 } as const;
    expect(omit(['city' as keyof typeof obj], obj)).toEqual({ name: 'John', age: 30 });
  });

  it('应该返回原对象的副本当没有属性被排除时', () => {
    const obj = { name: 'John', age: 30 };
    const result = omit([], obj);
    expect(result).toEqual(obj);
    expect(result).not.toBe(obj);
  });

  it('应该支持不同类型的属性值', () => {
    const obj = {
      str: 'string',
      num: 123,
      bool: true,
      arr: [1, 2, 3],
      obj: { x: 1 },
      fn: () => {},
      sym: Symbol('test'),
    };
    expect(omit(['str', 'num', 'bool'], obj)).toEqual({
      arr: [1, 2, 3],
      obj: { x: 1 },
      fn: expect.any(Function),
      sym: expect.any(Symbol),
    });
  });

  it('应该保持原始对象的属性顺序', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const result = omit(['b', 'd'], obj);
    expect(Object.keys(result)).toEqual(['a', 'c']);
  });
});
