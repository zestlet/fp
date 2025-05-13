import { describe, it, expect } from 'vitest';
import { values } from './values';

describe('values', () => {
  it('应该返回对象的所有值', () => {
    const obj = { name: 'John', age: 30 };
    expect(values(obj)).toEqual(['John', 30]);
  });

  it('应该包含Symbol键对应的值', () => {
    const sym1 = Symbol('sym1');
    const sym2 = Symbol('sym2');
    const obj = { [sym1]: 'value1', [sym2]: 'value2', name: 'John' };
    const result = values(obj);
    expect(result).toContain('John');
    expect(result).toContain('value1');
    expect(result).toContain('value2');
    expect(result).toHaveLength(3);
  });

  it('应该保持值的顺序', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(values(obj)).toEqual([1, 2, 3, 4]);
  });

  it('应该正确处理空对象', () => {
    const obj = {};
    expect(values(obj)).toEqual([]);
  });

  it('应该正确处理不同类型的值', () => {
    const obj = {
      str: 'string',
      num: 123,
      bool: true,
      arr: [1, 2, 3],
      obj: { x: 1 },
      fn: () => {},
      sym: Symbol('test'),
    };
    const result = values(obj);
    expect(result).toContain('string');
    expect(result).toContain(123);
    expect(result).toContain(true);
    expect(result).toContainEqual([1, 2, 3]);
    expect(result).toContainEqual({ x: 1 });
    expect(result.some(v => typeof v === 'function')).toBe(true);
    expect(result).toContain(obj.sym);
    expect(result).toHaveLength(7);
  });

  it('应该正确处理嵌套对象', () => {
    const obj = {
      user: { name: 'John', age: 30 },
      settings: { theme: 'dark', language: 'en' },
    };
    const result = values(obj);
    expect(result).toContainEqual({ name: 'John', age: 30 });
    expect(result).toContainEqual({ theme: 'dark', language: 'en' });
    expect(result).toHaveLength(2);
  });
});
