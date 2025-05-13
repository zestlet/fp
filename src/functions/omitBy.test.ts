import { describe, expect, it } from 'vitest';
import { omitBy } from './omitBy';

describe('omitBy', () => {
  it('应该根据值条件排除属性', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omitBy(x => x > 1, obj);
    expect(result).toEqual({ a: 1 });
    expect(result).not.toBe(obj);
  });

  it('应该根据键条件排除属性', () => {
    const obj = { _a: 1, b: 2, _c: 3 };
    const result = omitBy((_, key) => key.startsWith('_'), obj);
    expect(result).toEqual({ b: 2 });
  });

  it('应该支持柯里化调用', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const omitGreaterThanOne = omitBy(x => (x as number) > 1);
    const result = omitGreaterThanOne(obj);
    expect(result).toEqual({ a: 1 });
  });

  it('应该处理空对象', () => {
    const obj = {};
    const result = omitBy(x => x > 1, obj);
    expect(result).toEqual({});
  });

  it('应该保持不可变性', () => {
    const obj = { a: 1, b: 2 };
    const result = omitBy(x => x > 1, obj);
    expect(result).not.toBe(obj);
    expect(obj).toEqual({ a: 1, b: 2 });
  });

  it('应该正确处理所有属性都满足条件的情况', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omitBy(x => x > 0, obj);
    expect(result).toEqual({});
  });

  it('应该正确处理所有属性都不满足条件的情况', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const result = omitBy(x => x > 3, obj);
    expect(result).toEqual(obj);
  });
});
