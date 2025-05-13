import { describe, expect, it } from 'vitest';
import { setPath } from './setPath';

describe('setPath', () => {
  it('应该正确设置嵌套对象的属性值', () => {
    const obj = {
      user: {
        name: 'John',
        age: 30,
        address: {
          city: 'New York',
          zip: '10001',
        },
      },
    };

    const result = setPath(['user', 'age'], 31, obj) as typeof obj;
    expect(result).toEqual({
      user: {
        name: 'John',
        age: 31,
        address: {
          city: 'New York',
          zip: '10001',
        },
      },
    });
    expect(result).not.toBe(obj);
    expect(result.user).not.toBe(obj.user);
    expect(result.user.address).toBe(obj.user.address);
  });

  it('应该支持柯里化调用', () => {
    const obj = {
      user: {
        name: 'John',
        age: 30,
      },
    };

    const setUserAge = setPath(['user', 'age']);
    const setUserAgeTo31 = setUserAge(31);
    const result = setUserAgeTo31(obj) as typeof obj;

    expect(result).toEqual({
      user: {
        name: 'John',
        age: 31,
      },
    });
  });

  it('应该支持数字键', () => {
    const obj = {
      '0': {
        '1': 'value',
      },
    };

    const result = setPath(['0', '1'], 'new value', obj) as typeof obj;
    expect(result).toEqual({
      '0': {
        '1': 'new value',
      },
    });
  });

  it('应该支持 Symbol 键', () => {
    const sym = Symbol('test');
    const obj = {
      [sym]: {
        nested: 'value',
      },
    };

    const result = setPath([sym, 'nested'], 'new value', obj) as typeof obj;
    expect(result[sym].nested).toBe('new value');
  });

  it('应该对空路径返回新值', () => {
    const obj = { name: 'John' };
    const result = setPath([], 'new value', obj);
    expect(result).toBe('new value');
  });

  it('应该自动创建不存在的对象路径', () => {
    const obj = { name: 'John' };
    const result = setPath(['user', 'address', 'city'], 'New York', obj) as typeof obj & {
      user: { address: { city: string } };
    };
    expect(result).toEqual({
      name: 'John',
      user: {
        address: {
          city: 'New York',
        },
      },
    });
  });

  it('应该自动创建不存在的数组路径', () => {
    const obj = {};
    const result = setPath(['items', 0, 'name'], 'Item 1', obj);
    expect(result).toEqual({
      items: [
        {
          name: 'Item 1',
        },
      ],
    });
  });

  it('应该对非负整数键创建数组', () => {
    const obj = {};
    const result = setPath(['items', 0, 'name'], 'Item 1', obj);
    expect(Array.isArray(result.items)).toBe(true);
  });

  it('应该对非整数键创建对象', () => {
    const obj = {};
    const result = setPath(['items', '0', 'name'], 'Item 1', obj);
    expect(Array.isArray(result.items)).toBe(false);
  });

  it('应该对负数键创建对象', () => {
    const obj = {};
    const result = setPath(['items', -1, 'name'], 'Item 1', obj);
    expect(Array.isArray(result.items)).toBe(false);
  });

  it('应该对数组使用非数字索引时抛出错误', () => {
    const obj = [1, 2, 3];
    expect(() => setPath(['invalid'], 'value', obj)).toThrow('Cannot use non-numeric index with array: invalid');
  });

  it('应该保持其他属性的引用一致性', () => {
    const nested = { x: 1 };
    const obj = {
      a: nested,
      b: {
        c: 'test',
      },
    };

    const result = setPath(['b', 'c'], 'new test', obj);
    expect(result.a).toBe(nested);
  });

  it('应该正确处理 undefined 或 null 对象', () => {
    const result1 = setPath(['user', 'name'], 'John', undefined);
    expect(result1).toEqual({
      user: {
        name: 'John',
      },
    });

    const result2 = setPath(['user', 'name'], 'John', null);
    expect(result2).toEqual({
      user: {
        name: 'John',
      },
    });
  });
});
