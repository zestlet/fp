import { describe, it, expect } from 'vitest';
import { mergeWith, mergeWithInPlace, MergeWithCustomizer, mergeDeleteSymbol } from './mergeWith';

describe('mergeWith', () => {
  // 基本合并测试
  it('应该正确合并两个简单对象', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = mergeWith(null)(target, source);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  // 深度合并测试
  it('应该正确进行深度合并', () => {
    const target = {
      a: { x: 1, y: 2 },
      b: { z: 3 },
    };
    const source = {
      a: { y: 3, z: 4 },
      b: { w: 5 },
    };
    const result = mergeWith(null)(target, source);
    expect(result).toEqual({
      a: { x: 1, y: 3, z: 4 },
      b: { z: 3, w: 5 },
    });
  });

  // mergeDeleteSymbol 测试
  it('应该正确处理 mergeDeleteSymbol', () => {
    const target = { a: 1, b: 2, c: 3 };
    const source = { b: mergeDeleteSymbol, d: 4 };
    const result = mergeWith(null)(target, source);
    expect(result).toEqual({ a: 1, c: 3, d: 4 });
  });

  // mergeDeleteSymbol 深度删除测试
  it('应该正确处理深层的 mergeDeleteSymbol', () => {
    const target = {
      a: { x: 1, y: 2 },
      b: { z: 3 },
    };
    const source = {
      a: { y: mergeDeleteSymbol, z: 4 },
      b: mergeDeleteSymbol,
    };
    const result = mergeWith(null)(target, source);
    expect(result).toEqual({
      a: { x: 1, z: 4 },
    });
  });

  describe('mergeWith', () => {
    const customizer: MergeWithCustomizer = (s, t) => (typeof s === 'number' && typeof t === 'number' ? s + t : undefined);

    it('应该支持完整参数调用', () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = mergeWith(customizer)(target, source);
      expect(result).toEqual({ a: 1, b: 5, c: 4 });
    });

    it('应该支持部分参数调用', () => {
      const merger = mergeWith(customizer);
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };

      const result1 = merger(target, source);
      const result2 = merger(target)(source);

      expect(result1).toEqual(result2);
      expect(result1).toEqual({ a: 1, b: 5, c: 4 });
    });
  });

  describe('mergeWithInPlace', () => {
    const customizer: MergeWithCustomizer = (s, t) => (typeof s === 'number' && typeof t === 'number' ? s + t : undefined);

    it('应该支持原地修改', () => {
      const target = { a: 1, b: { x: 1 } };
      const source = { b: { y: 2 } };
      const result = mergeWithInPlace(null)(target, source);

      // 验证结果正确性
      expect(result).toEqual({ a: 1, b: { x: 1, y: 2 } });
      // 验证是否原地修改
      expect(result).toBe(target);
      expect(result.b).toBe(target.b);
    });

    it('应该支持自定义合并函数', () => {
      const target = { a: 1, b: 2 };
      const source = { b: 3, c: 4 };
      const result = mergeWithInPlace(customizer)(target, source);

      expect(result).toBe(target);
      expect(result).toEqual({ a: 1, b: 5, c: 4 });
    });

    it('应该正确处理 mergeDeleteSymbol', () => {
      const target = { a: 1, b: 2, c: 3 };
      const source = { b: mergeDeleteSymbol, d: 4 };
      const result = mergeWithInPlace(null)(target, source);

      expect(result).toBe(target);
      expect(result).toEqual({ a: 1, c: 3, d: 4 });
    });
  });

  // 合并上下文测试
  it('应该提供正确的合并上下文', () => {
    const target = { a: { b: { c: 1 } } };
    const source = { a: { b: { c: 2 } } };
    const paths: (string | number)[][] = [];
    const keys: (string | number)[] = [];

    const customizer = (sourceValue: any, targetValue: any, context: any) => {
      paths.push([...context.path]);
      keys.push(context.key);
      return undefined;
    };

    mergeWith(customizer)(target, source);

    expect(paths).toEqual([['a'], ['a', 'b'], ['a', 'b', 'c']]);
    expect(keys).toEqual(['a', 'b', 'c']);
  });

  // 复杂对象合并测试
  it('应该正确合并复杂对象', () => {
    const target = {
      info: {
        name: 'John',
        age: 30,
        address: {
          city: 'New York',
          country: 'USA',
        },
      },
      hobbies: ['reading'],
    };

    const source = {
      info: {
        age: 31,
        address: {
          street: 'Broadway',
          city: mergeDeleteSymbol,
        },
      },
      hobbies: ['gaming'],
    };

    const result = mergeWith(null)(target, source);
    expect(result).toEqual({
      info: {
        name: 'John',
        age: 31,
        address: {
          country: 'USA',
          street: 'Broadway',
        },
      },
      hobbies: ['gaming'],
    });
  });

  // 循环引用测试
  it('应该正确处理循环引用', () => {
    const target: any = { a: 1 };
    target.self = target;
    const source: any = { b: 2 };
    source.self = source;

    const result = mergeWith(null)(target, source);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.self).toBe(result);
  });

  // 空值处理测试
  it('应该正确处理空值', () => {
    const target = { a: 1, b: null };
    const source = { b: 2, c: undefined };
    const result = mergeWith(null)(target, source);
    expect(result).toEqual({ a: 1, b: 2, c: undefined });
  });

  // 错误处理测试
  it('应该正确处理无效输入', () => {
    // @ts-ignore
    expect(mergeWith(null)(null, { a: 1 })).toEqual({ a: 1 });
    // @ts-ignore
    expect(mergeWith(null)({ a: 1 }, null)).toEqual(null);
    // @ts-ignore
    expect(mergeWith(null)(undefined, { b: 2 })).toEqual({ b: 2 });
    // @ts-ignore
    expect(mergeWith(null)({ b: 2 }, undefined)).toEqual(undefined);
  });
});
