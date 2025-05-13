import { describe, expect, it } from 'vitest';
import { set } from './set';

describe('set', () => {
  it('应该正确设置基本类型的属性值', () => {
    const obj = { name: 'John', age: 30 };
    const result = set('age', 31, obj);
    expect(result).toEqual({ name: 'John', age: 31 });
    expect(result).not.toBe(obj);
  });

  it('应该保持非基本类型值的引用一致性', () => {
    const nested = { x: 1, y: 2 };
    const arr = [1, 2, 3];
    const fn = () => {};
    const sym = Symbol('test');

    const obj = {
      nested,
      arr,
      fn,
      sym,
    };

    const result = set('nested', nested, obj);
    expect(result.nested).toBe(nested);
    expect(result.arr).toBe(arr);
    expect(result.fn).toBe(fn);
    expect(result.sym).toBe(sym);
  });

  it('应该支持柯里化调用', () => {
    const obj = { name: 'John', age: 30 };
    const setAge = set('age');
    const setAgeTo31 = setAge(31);
    const result = setAgeTo31(obj);
    expect(result).toEqual({ name: 'John', age: 31 });
  });

  it('应该正确处理字面量类型', () => {
    const obj = {
      name: 'John' as const,
      age: 30 as const,
      active: true as const,
    } as const;

    const result = set('name', 'John', obj);
    // 类型应该是字面量 'John'
    const _name: string = result.name;

    const result2 = set('age', 30, obj);
    // 类型应该是字面量 30
    const _age: number = result2.age;
  });

  it('应该支持数字键', () => {
    const obj = {
      '0': 'zero',
      '1': 'one',
    };

    const result = set('0', 'new zero', obj);
    expect(result).toEqual({
      '0': 'new zero',
      '1': 'one',
    });
  });

  it('应该支持 Symbol 键', () => {
    const sym = Symbol('test');
    const obj = {
      [sym]: 'value',
    };

    const result = set(sym, 'new value', obj);
    expect(result[sym]).toBe('new value');
  });

  it('应该保持其他属性的引用一致性', () => {
    const nested = { x: 1 };
    const obj = {
      a: nested,
      b: 'test',
    };

    const result = set('b', 'new test', obj);
    expect(result.a).toBe(nested);
  });
});
