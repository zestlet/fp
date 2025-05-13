import { describe, expect, it, vi } from 'vitest';
import { tap } from './tap';

describe('tap', () => {
  it('应该执行副作用并返回原值', () => {
    const fn = vi.fn();
    const result = tap(fn, 5);
    expect(fn).toHaveBeenCalledWith(5);
    expect(result).toBe(5);
  });

  it('应该支持柯里化调用', () => {
    const fn = vi.fn();
    const tapFn = tap(fn);
    const result = tapFn(5);
    expect(fn).toHaveBeenCalledWith(5);
    expect(result).toBe(5);
  });

  it('应该正确处理对象', () => {
    const fn = vi.fn();
    const obj = { a: 1, b: 2 };
    const result = tap(fn, obj);
    expect(fn).toHaveBeenCalledWith(obj);
    expect(result).toBe(obj);
  });

  it('应该正确处理数组', () => {
    const fn = vi.fn();
    const arr = [1, 2, 3];
    const result = tap(fn, arr);
    expect(fn).toHaveBeenCalledWith(arr);
    expect(result).toBe(arr);
  });

  it('应该正确处理 null 和 undefined', () => {
    const fn = vi.fn();
    expect(tap(fn, null)).toBe(null);
    expect(fn).toHaveBeenCalledWith(null);

    expect(tap(fn, undefined)).toBe(undefined);
    expect(fn).toHaveBeenCalledWith(undefined);
  });
});
