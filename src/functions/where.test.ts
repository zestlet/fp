import { describe, it, expect } from 'vitest';
import { where } from './where';

describe('where', () => {
  it('当对象满足所有断言时应该返回 true', () => {
    const predicates = {
      name: (x: string) => x.length > 0,
      age: (x: number) => x >= 18,
    };
    const obj = { name: 'Alice', age: 20, role: 'admin' };
    expect(where(predicates, obj)).toBe(true);
  });

  it('当对象不满足任何断言时应该返回 false', () => {
    const predicates = {
      name: (x: string) => x.length > 0,
      age: (x: number) => x >= 18,
    };
    const obj = { name: '', age: 16 };
    expect(where(predicates, obj)).toBe(false);
  });

  it('当对象部分满足断言时应该返回 false', () => {
    const predicates = {
      name: (x: string) => x.length > 0,
      age: (x: number) => x >= 18,
    };
    const obj = { name: 'Alice', age: 16 };
    expect(where(predicates, obj)).toBe(false);
  });

  it('当规范对象为空时应该返回 true', () => {
    const predicates = {};
    const obj = { name: 'Alice', age: 20 };
    expect(where(predicates, obj)).toBe(true);
  });

  it('应该不支持嵌套对象', () => {
    const predicates = {
      user: {
        name: (x: string) => x.length > 0,
        age: (x: number) => x >= 18,
      },
    };
    const obj = { user: { name: 'Alice', age: 20, role: 'admin' } };
    // @ts-expect-error 测试错误
    expect(() => where(predicates, obj)).toThrow('predicate is not a function');
  });

  it('应该支持数组属性', () => {
    const predicates = {
      tags: (x: string[]) => x.length > 0,
    };
    const obj = { tags: ['a', 'b'], name: 'Alice' };
    expect(where(predicates, obj)).toBe(true);
  });

  it('应该正确处理特殊值', () => {
    const predicates = {
      a: (x: null) => x === null,
      b: (x: undefined) => x === undefined,
      c: (x: number) => Number.isNaN(x),
    };
    const obj = { a: null, b: undefined, c: NaN, d: 1 };
    expect(where(predicates, obj)).toBe(true);
  });

  it('应该支持柯里化调用', () => {
    const predicates = {
      name: (x: string) => x.length > 0,
    };
    const hasName = where(predicates);
    expect(hasName({ name: 'Alice', age: 20 })).toBe(true);
    expect(hasName({ name: '', age: 20 })).toBe(false);
  });

  it('应该正确处理对象数组', () => {
    const users = [
      { id: 1, name: 'Alice', age: 20 },
      { id: 2, name: 'Bob', age: 16 },
      { id: 3, name: 'Charlie', age: 25 },
    ];
    const isAdult = where({ age: (x: number) => x >= 18 });
    expect(users.some(isAdult)).toBe(true);
    expect(users.every(isAdult)).toBe(false);
  });
});
