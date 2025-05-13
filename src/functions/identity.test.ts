import { describe, expect, it } from 'vitest';
import { identity } from './identity';

describe('identity', () => {
  it('应该返回传入的值', () => {
    expect(identity(5)).toBe(5);
    expect(identity('test')).toBe('test');
    expect(identity(true)).toBe(true);
  });

  it('应该返回传入的对象引用', () => {
    const obj = { a: 1, b: 2 };
    expect(identity(obj)).toBe(obj);
  });

  it('应该返回传入的数组引用', () => {
    const arr = [1, 2, 3];
    expect(identity(arr)).toBe(arr);
  });

  it('应该返回传入的函数引用', () => {
    const fn = () => {};
    expect(identity(fn)).toBe(fn);
  });

  it('应该正确处理 null 和 undefined', () => {
    expect(identity(null)).toBe(null);
    expect(identity(undefined)).toBe(undefined);
  });
});
