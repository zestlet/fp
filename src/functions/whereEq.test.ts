import { describe, it, expect } from 'vitest';
import { whereEq } from './whereEq';

describe('whereEq', () => {
  it('当对象满足所有属性相等断言时应该返回 true', () => {
    const spec = { name: 'Alice', age: 20 };
    const obj = { name: 'Alice', age: 20, role: 'admin' };
    expect(whereEq(spec, obj)).toBe(true);
  });

  it('当对象不满足任何属性相等断言时应该返回 false', () => {
    const spec = { name: 'Alice', age: 20 };
    const obj = { name: 'Bob', age: 21 };
    expect(whereEq(spec, obj)).toBe(false);
  });

  it('当对象部分满足属性相等断言时应该返回 false', () => {
    const spec = { name: 'Alice', age: 20 };
    const obj = { name: 'Alice', age: 21 };
    expect(whereEq(spec, obj)).toBe(false);
  });

  it('当规范对象为空时应该返回 true', () => {
    const spec = {};
    const obj = { name: 'Alice', age: 20 };
    expect(whereEq(spec, obj)).toBe(true);
  });

  it('应该不支持嵌套对象', () => {
    const spec = { user: { name: 'Alice' } };
    const obj = { user: { name: 'Alice', age: 20 } };
    expect(whereEq(spec, obj)).toBe(false);
  });

  it('应该支持数组属性', () => {
    const spec = { tags: ['a', 'b'] };
    const obj = { tags: ['a', 'b'], name: 'Alice' };
    expect(whereEq(spec, obj)).toBe(true);
  });

  it('应该正确处理特殊值', () => {
    const spec = { a: null, b: undefined, c: NaN };
    const obj = { a: null, b: undefined, c: NaN, d: 1 };
    expect(whereEq(spec, obj)).toBe(true);
  });

  it('应该支持柯里化调用', () => {
    const spec = { name: 'Alice' } as const;
    const isAlice = whereEq(spec);
    expect(isAlice({ name: 'Alice', age: 20 })).toBe(true);
    expect(isAlice({ name: 'Bob', age: 20 })).toBe(false);
  });

  it('应该正确处理对象数组', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Alice' },
    ];
    const isAlice = whereEq({ name: 'Alice' });
    expect(users.some(isAlice)).toBe(true);
    expect(users.every(isAlice)).toBe(false);
  });
});
