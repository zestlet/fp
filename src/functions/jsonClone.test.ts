import { describe, it, expect } from 'vitest';
import { jsonClone } from './jsonClone';

describe('jsonClone', () => {
  it('应该能正确克隆基本类型', () => {
    expect(jsonClone(42)).toBe(42);
    expect(jsonClone('hello')).toBe('hello');
    expect(jsonClone(true)).toBe(true);
    expect(jsonClone(null)).toBe(null);
  });

  it('应该能正确克隆数组', () => {
    const array = [1, 2, 3, { a: 4 }];
    const cloned = jsonClone(array);
    expect(cloned).toEqual(array);
    expect(cloned).not.toBe(array);
    expect(cloned[3]).not.toBe(array[3]);
  });

  it('应该能正确克隆对象', () => {
    const obj = { a: 1, b: { c: 2 } };
    const cloned = jsonClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.b).not.toBe(obj.b);
  });

  it('当遇到循环引用时应该抛出错误', () => {
    const obj: any = { a: 1 };
    obj.self = obj;
    expect(() => jsonClone(obj)).toThrow();
  });

  it('当遇到BigInt时应该抛出错误', () => {
    const obj = { a: 1n };
    expect(() => jsonClone(obj)).toThrow();
  });

  it('当遇到函数时应该返回空对象', () => {
    const obj = { a: () => {} };
    const result = jsonClone(obj);
    expect(Object.entries(result).length).toBe(0);
  });

  it('当遇到Symbol时应该返回空对象', () => {
    const obj = { a: Symbol('test') };
    const result = jsonClone(obj);
    expect(Object.entries(result).length).toBe(0);
  });

  it('当遇到undefined时应该返回空对象', () => {
    const obj = { a: undefined };
    const result = jsonClone(obj);
    expect(Object.entries(result).length).toBe(0);
  });
  it('当遇到Map时应该返回空对象', () => {
    const obj = { a: new Map() };
    const result = jsonClone(obj);
    expect(result).toEqual({ a: {} });
  });

  it('当遇到Set时应该返回空对象', () => {
    const obj = { a: new Set() };
    const result = jsonClone(obj);
    expect(result).toEqual({ a: {} });
  });

  it('当遇到RegExp时应该返回空对象', () => {
    const obj = { a: /test/ };
    const result = jsonClone(obj);
    expect(result).toEqual({ a: {} });
  });

  it('Date对象会被转换为字符串', () => {
    const date = new Date();
    const cloned = jsonClone(date);
    expect(cloned).toBe(date.toISOString());
  });

  it('NaN和Infinity会被转换为null', () => {
    const obj = { a: NaN, b: Infinity, c: -Infinity };
    const cloned = jsonClone(obj);
    expect(cloned).toEqual({ a: null, b: null, c: null });
  });

  it('应该支持嵌套对象和数组', () => {
    const obj = {
      a: [1, 2, { b: 3 }],
      c: { d: [4, 5] },
    };
    const cloned = jsonClone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.a).not.toBe(obj.a);
    expect(cloned.a[2]).not.toBe(obj.a[2]);
    expect(cloned.c).not.toBe(obj.c);
    expect(cloned.c.d).not.toBe(obj.c.d);
  });
});
