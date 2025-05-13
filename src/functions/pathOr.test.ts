import { describe, expect, it } from 'vitest';
import { pathOr } from './pathOr';

describe('pathOr', () => {
  it('should return the value at the given path', () => {
    const obj = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
          zip: 10001,
        },
      },
    };

    expect(pathOr('Unknown', ['user', 'name'], obj)).toBe('John');
    expect(pathOr('Unknown', ['user', 'address', 'city'], obj)).toBe('New York');
    expect(pathOr(0, ['user', 'address', 'zip'], obj)).toBe(10001);
  });

  it('should return the default value for non-existent paths', () => {
    const obj = {
      user: {
        name: 'John',
      },
    };

    expect(pathOr('Unknown', ['user', 'age'], obj)).toBe('Unknown');
    expect(pathOr('Unknown', ['user', 'address', 'city'], obj)).toBe('Unknown');
    expect(pathOr(0, ['user', 'address', 'zip'], obj)).toBe(0);
  });

  it('should support curried calls', () => {
    const obj = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
        },
      },
    };

    const getName = pathOr('Unknown', ['user', 'name']);
    expect(getName(obj)).toBe('John');

    const getAge = pathOr('Unknown', ['user', 'age']);
    expect(getAge(obj)).toBe('Unknown');
  });

  it('should handle empty paths', () => {
    const obj = { name: 'John' };
    expect(pathOr('Unknown', [], obj)).toBe(obj);
  });

  it('should handle null or undefined objects', () => {
    expect(pathOr('Unknown', ['user', 'name'], null)).toBe('Unknown');
    expect(pathOr('Unknown', ['user', 'name'], undefined)).toBe('Unknown');
  });

  it('should handle different types of path elements', () => {
    const sym = Symbol('test');
    const obj = {
      '0': 'zero',
      [sym]: 'symbol',
      nested: {
        '1': 'one',
      },
    };

    expect(pathOr('Unknown', ['0'], obj)).toBe('zero');
    expect(pathOr('Unknown', [sym], obj)).toBe('symbol');
    expect(pathOr('Unknown', ['nested', '1'], obj)).toBe('one');
    expect(pathOr('Unknown', ['nonexistent'], obj)).toBe('Unknown');
  });

  it('should handle different types of default values', () => {
    const obj = { user: { name: 'John' } };

    expect(pathOr('Unknown', ['user', 'age'], obj)).toBe('Unknown');
    expect(pathOr(0, ['user', 'age'], obj)).toBe(0);
    expect(pathOr(null, ['user', 'age'], obj)).toBe(null);
    expect(pathOr(undefined, ['user', 'age'], obj)).toBe(undefined);
    expect(pathOr({}, ['user', 'age'], obj)).toEqual({});
  });

  it('应该正确推断字面量类型', () => {
    const obj = {
      user: {
        name: 'John' as const,
        age: 30 as const,
        address: {
          city: 'New York' as const,
          zip: 10001 as const,
        },
      },
    };

    const name = pathOr('Unknown', ['user', 'name'], obj);
    expect(name).toBe('John');
    // 类型应该是字面量 'John'
    const _name: string = name;

    const age = pathOr(0, ['user', 'age'], obj);
    expect(age).toBe(30);
    // 类型应该是字面量 30
    const _age: number = age;

    const city = pathOr('Unknown', ['user', 'address', 'city'], obj);
    expect(city).toBe('New York');
    // 类型应该是字面量 'New York'
    const _city: string = city;
  });

  it('应该正确处理默认值类型', () => {
    const obj = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
        },
      },
    } as const;

    const age = pathOr(0, ['user', 'age'], obj);
    expect(age).toBe(0);
    // 类型应该是字面量 0
    const _age: number = age;

    const zip = pathOr(10000, ['user', 'address', 'zip'], obj);
    expect(zip).toBe(10000);
    // 类型应该是字面量 10000
    const _zip: number = zip;
  });

  it('应该支持数字键访问并保持类型推断', () => {
    const obj = {
      '0': 'zero' as const,
      '1': 'one' as const,
      '2': 'two' as const,
      nested: {
        '3': 'three' as const,
      },
    } as const;

    const zero = pathOr('unknown', ['0'], obj);
    expect(zero).toBe('zero');
    // 类型应该是字面量 'zero'
    const _zero: string = zero;

    const three = pathOr('unknown', ['nested', '3'], obj);
    expect(three).toBe('three');
    // 类型应该是字面量 'three'
    const _three: string = three;
  });

  it('应该支持 Symbol 键访问并保持类型推断', () => {
    const sym1 = Symbol('test1');
    const sym2 = Symbol('test2');
    const obj = {
      [sym1]: 'symbol1' as const,
      nested: {
        [sym2]: 'symbol2' as const,
      },
    } as const;

    const symbol1 = pathOr('unknown', [sym1], obj);
    expect(symbol1).toBe('symbol1');
    // 类型应该是字面量 'symbol1'
    const _symbol1: string = symbol1;

    const symbol2 = pathOr('unknown', ['nested', sym2], obj);
    expect(symbol2).toBe('symbol2');
    // 类型应该是字面量 'symbol2'
    const _symbol2: string = symbol2;
  });

  it('应该支持混合键类型访问并保持类型推断', () => {
    const sym = Symbol('test');
    const obj = {
      '0': 'zero' as const,
      [sym]: 'symbol' as const,
      nested: {
        '1': 'one' as const,
        [sym]: 'nested-symbol' as const,
      },
    } as const;

    const zero = pathOr('unknown', ['0'], obj);
    expect(zero).toBe('zero');
    // 类型应该是字面量 'zero'
    const _zero: string = zero;

    const symbol = pathOr('unknown', [sym], obj);
    expect(symbol).toBe('symbol');
    // 类型应该是字面量 'symbol'
    const _symbol: string = symbol;
  });

  it('应该支持柯里化调用并保持类型推断', () => {
    const obj = {
      user: {
        name: 'John' as const,
        address: {
          city: 'New York' as const,
        },
      },
    };

    const getName = pathOr('Unknown', ['user', 'name']);
    const name = getName(obj);
    expect(name).toBe('John');
    // 类型应该是字面量 'John'
    const _name: string = name;
  });

  it('应该处理空路径并保持类型推断', () => {
    const obj = { name: 'John' as const } as const;
    const result = pathOr({ name: 'Unknown' }, [], obj);
    expect(result).toBe(obj);
    // 类型应该是字面量对象
    const _result: { name: string } = result;
  });

  it('应该处理 null 或 undefined 对象并保持类型推断', () => {
    const result1 = pathOr('Unknown', ['user', 'name'], null);
    expect(result1).toBe('Unknown');
    // 类型应该是字面量 'Unknown'
    const _result1: string = result1;

    const result2 = pathOr('Unknown', ['user', 'name'], undefined);
    expect(result2).toBe('Unknown');
    // 类型应该是字面量 'Unknown'
    const _result2: string = result2;
  });
});
