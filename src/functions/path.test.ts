import { describe, expect, it } from 'vitest';
import { path } from './path';

describe('path', () => {
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
    } as const;

    const name = path(['user', 'name'], obj);
    expect(name).toBe('John');
    // 类型应该是字面量 'John'
    const _name: string = name;

    const age = path(['user', 'age'], obj);
    expect(age).toBe(30);
    // 类型应该是字面量 30
    const _age: number = age;

    const city = path(['user', 'address', 'city'], obj);
    expect(city).toBe('New York');
    // 类型应该是字面量 'New York'
    const _city: string = city;
  });

  it('应该正确处理 undefined 类型', () => {
    const obj = {
      user: {
        name: 'John',
        address: {
          city: 'New York',
        },
      },
    } as const;

    const age = path(['user', 'age'], obj);
    expect(age).toBeUndefined();
    // @ts-expect-error 类型应该是 undefined
    const _age: string = age;

    const zip = path(['user', 'address', 'zip'], obj);
    expect(zip).toBeUndefined();
    // @ts-expect-error 类型应该是 undefined
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

    const zero = path(['0'], obj);
    expect(zero).toBe('zero');
    // 类型应该是字面量 'zero'
    const _zero: string = zero;

    const three = path(['nested', '3'], obj);
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

    const symbol1 = path([sym1], obj);
    expect(symbol1).toBe('symbol1');
    // 类型应该是字面量 'symbol1'
    const _symbol1: string = symbol1;

    const symbol2 = path(['nested', sym2], obj);
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

    const zero = path(['0'], obj);
    expect(zero).toBe('zero');
    // 类型应该是字面量 'zero'
    const _zero: string = zero;

    const symbol = path([sym], obj);
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

    const getName = path(['user', 'name']);
    const name = getName(obj);
    expect(name).toBe('John');
    // 类型应该是字面量 'John'
    const _name: string = name;
  });

  it('应该处理空路径并保持类型推断', () => {
    const obj = { name: 'John' as const } as const;
    const result = path([], obj);
    expect(result).toBe(obj);
    // 类型应该是字面量对象
    const _result: { name: string } = result;
  });

  it('应该处理 null 或 undefined 对象并保持类型推断', () => {
    const result1 = path(['user', 'name'], null);
    expect(result1).toBeUndefined();
    // @ts-expect-error 类型应该是 undefined
    const _result1: string = result1;

    const result2 = path(['user', 'name'], undefined);
    expect(result2).toBeUndefined();
    // @ts-expect-error 类型应该是 undefined
    const _result2: string = result2;
  });
});
