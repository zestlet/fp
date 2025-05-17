import { describe, it, expect } from 'vitest';
import { pathEq } from './pathEq';

describe('pathEq', () => {
  it('应该正确检查对象的路径值', () => {
    const obj = {
      user: {
        profile: {
          name: 'Alice',
          age: 20,
        },
        settings: {
          theme: 'dark',
        },
      },
    };
    expect(pathEq('Alice', ['user', 'profile', 'name'], obj)).toBe(true);
    expect(pathEq(20, ['user', 'profile', 'age'], obj)).toBe(true);
    expect(pathEq('dark', ['user', 'settings', 'theme'], obj)).toBe(true);
  });

  it('当路径值不相等时应该返回false', () => {
    const obj = {
      user: {
        profile: {
          name: 'Alice',
          age: 20,
        },
      },
    };
    expect(pathEq('Bob', ['user', 'profile', 'name'], obj)).toBe(false);
    expect(pathEq(21, ['user', 'profile', 'age'], obj)).toBe(false);
  });

  it('当路径不存在时应该返回false', () => {
    const obj = {
      user: {
        profile: {
          name: 'Alice',
        },
      },
    };
    expect(pathEq(20, ['user', 'profile', 'age'], obj)).toBe(false);
    expect(pathEq({}, ['user', 'settings'], obj)).toBe(false);
    expect(pathEq('New York', ['user', 'profile', 'address', 'city'], obj)).toBe(false);
  });

  it('应该支持柯里化调用', () => {
    const obj = {
      user: {
        profile: {
          name: 'Alice',
          role: 'admin',
        },
      },
    };
    const isAdmin = pathEq('admin', ['user', 'profile', 'role']);
    expect(isAdmin(obj)).toBe(true);
    expect(isAdmin({ user: { profile: { role: 'user' } } })).toBe(false);
  });

  it('应该支持多层柯里化', () => {
    const obj = {
      user: {
        profile: {
          name: 'Alice',
        },
      },
    };
    const checkName = pathEq('Alice');
    const isAlice = checkName(['user', 'profile', 'name']);
    expect(isAlice(obj)).toBe(true);
    expect(isAlice({ user: { profile: { name: 'Bob' } } })).toBe(false);
  });

  it('应该正确处理特殊值', () => {
    const obj = {
      a: {
        b: {
          c: null,
          d: undefined,
          e: NaN,
          f: Infinity,
          g: -Infinity,
        },
      },
    };
    expect(pathEq(null, ['a', 'b', 'c'], obj)).toBe(true);
    expect(pathEq(undefined, ['a', 'b', 'd'], obj)).toBe(true);
    expect(pathEq(NaN, ['a', 'b', 'e'], obj)).toBe(false); // NaN 比较总是返回 false
    expect(pathEq(Infinity, ['a', 'b', 'f'], obj)).toBe(true);
    expect(pathEq(-Infinity, ['a', 'b', 'g'], obj)).toBe(true);
  });

  it('应该支持数组索引', () => {
    const obj = {
      users: [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }],
    };
    expect(pathEq('Alice', ['users', 0, 'name'], obj)).toBe(true);
    expect(pathEq('Bob', ['users', 1, 'name'], obj)).toBe(true);
    expect(pathEq('Charlie', ['users', 2, 'name'], obj)).toBe(true);
    expect(pathEq('David', ['users', 3, 'name'], obj)).toBe(false);
  });

  it('应该处理空路径', () => {
    const obj = { value: 42 };
    expect(pathEq(obj, [], obj)).toBe(true);
    expect(pathEq({}, [], obj)).toBe(false);
  });
});
