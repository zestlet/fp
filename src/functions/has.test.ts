import { describe, it, expect } from 'vitest';
import { has } from './has';

describe('has', () => {
  it('应该检查对象是否包含指定属性', () => {
    const obj = { name: 'John', age: 30 } as const;
    expect(has('name', obj)).toBe(true);
    expect(has('age', obj)).toBe(true);
  });

  it('应该支持柯里化调用', () => {
    const obj = { name: 'John', age: 30 } as const;
    const hasName = has('name');
    expect(hasName(obj)).toBe(true);
  });

  it('应该正确处理Symbol键', () => {
    const sym = Symbol('sym');
    const obj = { [sym]: 'value', name: 'John' } as const;
    expect(has(sym, obj)).toBe(true);
    expect(has(Symbol('other') as never, obj)).toBe(false);
  });

  it('应该正确处理数字键', () => {
    const obj = { 1: 'one', 2: 'two' } as const;
    expect(has(1, obj)).toBe(true);
    expect(has(3 as never, obj)).toBe(false);
  });

  it('应该正确处理空对象', () => {
    const obj = {} as const;
    expect(has('any' as never, obj)).toBe(false);
  });

  it('应该正确处理继承的属性', () => {
    const parent = { name: 'John' } as const;
    const child = Object.create(parent);
    expect(has('name' as never, child)).toBe(false);
  });

  it('应该正确处理不同类型的键', () => {
    const sym = Symbol('sym');
    const obj = {
      str: 'string',
      123: 'number',
      [sym]: 'symbol',
    } as const;
    expect(has('str', obj)).toBe(true);
    expect(has(123, obj)).toBe(true);
    expect(has(sym, obj)).toBe(true);
    expect(has('nonexistent' as never, obj)).toBe(false);
  });

  it('应该支持柯里化调用', () => {
    const hasName = has('name');
    expect(hasName({ name: 'John' })).toBe(true);
    expect(hasName({ age: 30 })).toBe(false);
  });
});
