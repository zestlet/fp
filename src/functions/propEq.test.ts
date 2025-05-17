import { describe, it, expect } from 'vitest';
import { propEq } from './propEq';

describe('propEq', () => {
  it('应该正确检查对象的属性值', () => {
    const obj = { id: 1, name: 'Alice', age: 20 };
    expect(propEq(1, 'id', obj)).toBe(true);
    expect(propEq('Alice', 'name', obj)).toBe(true);
    expect(propEq(20, 'age', obj)).toBe(true);
  });

  it('当属性值不相等时应该返回false', () => {
    const obj = { id: 1, name: 'Alice', age: 20 };
    expect(propEq(2, 'id', obj)).toBe(false);
    expect(propEq('Bob', 'name', obj)).toBe(false);
    expect(propEq(21, 'age', obj)).toBe(false);
  });

  it('当属性不存在时应该返回false', () => {
    const obj = { id: 1, name: 'Alice' };
    expect(propEq(20, 'age', obj)).toBe(false);
    expect(propEq('admin', 'role', obj)).toBe(false);
  });

  it('应该支持柯里化调用', () => {
    const obj = { id: 1, name: 'Alice', role: 'admin' };
    const isAdmin = propEq('admin', 'role');
    expect(isAdmin(obj)).toBe(true);
    expect(isAdmin({ role: 'user' })).toBe(false);
  });

  it('应该支持多层柯里化', () => {
    const obj = { id: 1, name: 'Alice' };
    const checkName = propEq('Alice');
    const isAlice = checkName('name');
    expect(isAlice(obj)).toBe(true);
    expect(isAlice({ name: 'Bob' })).toBe(false);
  });

  it('应该正确处理特殊值', () => {
    const obj = {
      a: null,
      b: undefined,
      c: NaN,
      d: Infinity,
      e: -Infinity,
    };
    expect(propEq(null, 'a', obj)).toBe(true);
    expect(propEq(undefined, 'b', obj)).toBe(true);
    expect(propEq(NaN, 'c', obj)).toBe(true);
    expect(propEq(Infinity, 'd', obj)).toBe(true);
    expect(propEq(-Infinity, 'e', obj)).toBe(true);
  });

  it('应该支持对象数组', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const isAlice = propEq('Alice', 'name' as keyof (typeof users)[0]);
    expect(users.some(user => isAlice(user))).toBe(true);
    expect(users.every(user => isAlice(user))).toBe(false);
  });
});
