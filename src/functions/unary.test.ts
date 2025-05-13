import { describe, expect, it } from 'vitest';
import { unary } from './unary';

describe('unary', () => {
  it('应该只接受第一个参数', () => {
    const fn = (a: number, b: number) => a + (b ?? 0);
    const unaryFn = unary(fn);
    // @ts-expect-error test more than one argument
    expect(unaryFn(1, 2, 3)).toBe(1);
  });

  it('应该正确处理不同类型的参数', () => {
    const fn = (a: string, b: number) => a + (b ?? '');
    const unaryFn = unary(fn);
    // @ts-expect-error test more than one argument
    expect(unaryFn('test', 123)).toBe('test');
  });

  it('应该正确处理对象参数', () => {
    const fn = (a: { x: number }, b: number) => a.x + (b ?? 0);
    const unaryFn = unary(fn);
    // @ts-expect-error test more than one argument
    expect(unaryFn({ x: 1 }, 2)).toEqual(1);
  });

  it('应该正确处理数组参数', () => {
    const fn = (a: number[], b: number) => a[0] + (b ?? 0);
    const unaryFn = unary(fn);
    // @ts-expect-error test more than one argument
    expect(unaryFn([1, 2, 3], 4)).toEqual(1);
  });

  it('应该正确处理 null 和 undefined', () => {
    const fn = (a: any, b: any) => (b ? b : a);
    const unaryFn = unary(fn);
    // @ts-expect-error test more than one argument
    expect(unaryFn(null, 1)).toBe(null);
    // @ts-expect-error test more than one argument
    expect(unaryFn(undefined, 1)).toBe(undefined);
  });
});
