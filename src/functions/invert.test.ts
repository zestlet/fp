import { describe, expect, it } from 'vitest';
import { invert } from './invert';

describe('invert', () => {
  it('应该正确交换对象的键值对', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = invert(obj);
    expect(result).toEqual({ '1': 'a', '2': 'b', '3': 'c' });
    expect(result).not.toBe(obj);
  });

  it('应该处理重复值，后者覆盖前者', () => {
    const obj = { a: 1, b: 2, c: 1 };
    const result = invert(obj);
    expect(result).toEqual({ '1': 'c', '2': 'b' });
  });

  it('应该支持数字键', () => {
    const obj = { 1: 'a', 2: 'b', 3: 'c' };
    const result = invert(obj);
    expect(result).toEqual({ a: '1', b: '2', c: '3' });
  });

  it('应该处理空对象', () => {
    const obj = {};
    const result = invert(obj);
    expect(result).toEqual({});
  });

  it('应该保持不可变性', () => {
    const obj = { a: 1, b: 2 };
    const result = invert(obj);
    expect(result).not.toBe(obj);
    expect(obj).toEqual({ a: 1, b: 2 });
  });
});
