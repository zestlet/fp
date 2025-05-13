import { describe, expect, it } from 'vitest';
import { propOr } from './propOr';

describe('propOr', () => {
  it('应该返回已存在属性的值', () => {
    const obj = { name: 'John', age: 30 } as const;
    expect(propOr('Unknown', 'name', obj)).toBe('John');
    expect(propOr(0, 'age', obj)).toBe(30);
  });

  it('当属性不存在时应该返回默认值', () => {
    const obj = { name: 'John' } as const;
    expect(propOr('Unknown', 'age' as never, obj)).toBe('Unknown');
    expect(propOr(0, 'score' as never, obj)).toBe(0);
  });

  it('应该支持柯里化调用', () => {
    const obj = { name: 'John', age: 30 } as const;
    const getName = propOr('Unknown', 'name');
    expect(getName(obj)).toBe('John');

    const getAge = propOr(0, 'age');
    expect(getAge(obj)).toBe(30);

    const getScore = propOr(0, 'score' as never);
    expect(getScore(obj)).toBe(0);
  });

  it('应该处理不同类型的默认值', () => {
    const obj = { name: 'John' } as const;
    expect(propOr('Unknown', 'age' as never, obj)).toBe('Unknown');
    expect(propOr(0, 'age' as never, obj)).toBe(0);
    expect(propOr(null, 'age' as never, obj)).toBe(null);
    expect(propOr(undefined, 'age' as never, obj)).toBe(undefined);
    expect(propOr({}, 'age' as never, obj)).toEqual({});
  });

  it('应该处理不同类型的属性键', () => {
    const sym = Symbol('test');
    const obj = {
      '0': 'zero',
      [sym]: 'symbol',
      name: 'John',
    } as const;

    expect(propOr('Unknown', '0', obj)).toBe('zero');
    expect(propOr('Unknown', sym, obj)).toBe('symbol');
    expect(propOr('Unknown', 'name', obj)).toBe('John');
  });

  it('应该处理 null 或 undefined 对象', () => {
    expect(propOr('Unknown', 'name', null as never)).toBe('Unknown');
    expect(propOr('Unknown', 'name', undefined as never)).toBe('Unknown');
  });

  it('应该处理继承属性', () => {
    const parent = { name: 'John' } as const;
    const child = Object.create(parent);
    child.age = 30;

    expect(propOr('Unknown', 'name', child as never)).toBe('Unknown');
    expect(propOr('Unknown', 'age', child as never)).toBe(30);
  });
});
