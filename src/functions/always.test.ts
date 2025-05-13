import { describe, expect, it } from 'vitest';
import { always } from './always';

describe('always', () => {
  it('应该返回一个总是返回指定值的函数', () => {
    const alwaysTrue = always(true);
    expect(alwaysTrue()).toBe(true);
    expect(alwaysTrue()).toBe(true);
    expect(alwaysTrue()).toBe(true);
  });

  it('应该支持柯里化调用', () => {
    const alwaysFive = always(5);
    expect(alwaysFive()).toBe(5);
    expect(alwaysFive()).toBe(5);
  });

  it('应该正确处理对象和数组', () => {
    const obj = { a: 1, b: 2 };
    const alwaysObj = always(obj);
    expect(alwaysObj()).toBe(obj);
    expect(alwaysObj()).toBe(obj);

    const arr = [1, 2, 3];
    const alwaysArr = always(arr);
    expect(alwaysArr()).toBe(arr);
    expect(alwaysArr()).toBe(arr);
  });

  it('应该正确处理 null 和 undefined', () => {
    const alwaysNull = always(null);
    expect(alwaysNull()).toBe(null);
    expect(alwaysNull()).toBe(null);

    const alwaysUndefined = always(undefined);
    expect(alwaysUndefined()).toBe(undefined);
    expect(alwaysUndefined()).toBe(undefined);
  });
});
