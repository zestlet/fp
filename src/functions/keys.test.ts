import { describe, it, expect } from 'vitest';
import { keys } from './keys';

describe('keys', () => {
  it('应该返回对象的所有键', () => {
    const obj = { name: 'John', age: 30, 1: 2 };
    expect(keys(obj)).toEqual(['1', 'name', 'age']);
  });

  it('不应该包含Symbol键', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const obj = { [sym1]: 'value1', [sym2]: 'value2', name: 'John' };
    const result = keys(obj);
    expect(result).toContain('name');
    expect(result).not.toContain(sym1);
    expect(result).not.toContain(sym2);
    expect(result).not.toHaveLength(3);
  });

  it('应该保持键的顺序', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(keys(obj)).toEqual(['a', 'b', 'c', 'd']);
  });

  it('应该正确处理空对象', () => {
    const obj = {};
    expect(keys(obj)).toEqual([]);
  });

  it('应该正确处理数字键', () => {
    const obj = { 1: 'one', 2: 'two' };
    expect(keys(obj)).toEqual(['1', '2']);
  });

  it('应该正确处理混合键类型', () => {
    const sym = Symbol('sym');
    const obj = {
      str: 'string',
      123: 'number',
      [sym]: 'symbol',
    };
    const result = keys(obj);
    expect(result).toContain('str');
    expect(result).toContain('123');
    expect(result).not.toContain(sym);
    expect(result).toHaveLength(2);
  });
});
