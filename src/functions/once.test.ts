import { describe, it, expect, vi } from 'vitest';
import { once } from './once';

describe('once', () => {
  it('should only call the function once', () => {
    const spy = vi.fn((x: number) => x + 1);
    const f = once(spy);

    expect(f(1)).toBe(2);
    expect(f(2)).toBe(2);
    expect(f(3)).toBe(2);
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should work with functions that return undefined', () => {
    const spy = vi.fn(() => undefined);
    const f = once(spy);

    expect(f()).toBeUndefined();
    expect(f()).toBeUndefined();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should work with async functions', async () => {
    const spy = vi.fn(async (x: number) => x * 2);
    const f = once(spy);

    const result1 = await f(2);
    const result2 = await f(3);

    expect(result1).toBe(4);
    expect(result2).toBe(4);
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
