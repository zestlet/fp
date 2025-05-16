import { describe, it, expect } from 'vitest';
import { merge, mergeInPlace, mergeDeleteSymbol } from './merge';

describe('merge', () => {
  // 基本合并测试
  it('应该正确合并两个简单对象', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = merge(target, source);
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
    const result = merge(target, source);
    expect(result).toEqual({
      a: { x: 1, y: 3, z: 4 },
      b: { z: 3, w: 5 },
    });
  });

  // mergeDeleteSymbol 测试
  it('应该正确处理 mergeDeleteSymbol', () => {
    const target = { a: 1, b: 2, c: 3 };
    const source = { b: mergeDeleteSymbol, d: 4 };
    const result = merge(target, source);
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
    const result = merge(target, source);
    expect(result).toEqual({
      a: { x: 1, z: 4 },
    });
  });

  describe('mergeInPlace', () => {
    it('应该支持原地修改', () => {
      const target = { a: 1, b: { x: 1 } };
      const source = { b: { y: 2 } };
      const result = mergeInPlace(target, source);

      // 验证结果正确性
      expect(result).toEqual({ a: 1, b: { x: 1, y: 2 } });
      // 验证是否原地修改
      expect(result).toBe(target);
      expect(result.b).toBe(target.b);
    });

    it('应该正确处理 mergeDeleteSymbol', () => {
      const target = { a: 1, b: 2, c: 3 };
      const source = { b: mergeDeleteSymbol, d: 4 };
      const result = mergeInPlace(target, source);

      expect(result).toBe(target);
      expect(result).toEqual({ a: 1, c: 3, d: 4 });
    });
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

    const result = merge(target, source);
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

    const result = merge(target, source);
    expect(result.a).toBe(1);
    expect(result.b).toBe(2);
    expect(result.self).toBe(result);
  });

  // 数组合并测试
  it('应该正确合并数组', () => {
    const target = { arr: [1, 2, { x: 1 }] };
    const source = { arr: [3, 4, { y: 2 }] };
    const result = merge(target, source);
    expect(result.arr).toEqual([3, 4, { y: 2 }]);
    expect(result).not.toBe(target);
  });

  // 空值处理测试
  it('应该正确处理空值', () => {
    const target = { a: 1, b: null };
    const source = { b: 2, c: undefined };
    const result = merge(target, source);
    expect(result).toEqual({ a: 1, b: 2, c: undefined });
  });

  // 错误处理测试
  it('应该正确处理无效输入', () => {
    // @ts-ignore
    expect(merge(null, { a: 1 })).toEqual({ a: 1 });
    // @ts-ignore
    expect(merge({ a: 1 }, null)).toEqual(null);
    // @ts-ignore
    expect(merge(undefined, { b: 2 })).toEqual({ b: 2 });
    // @ts-ignore
    expect(merge({ b: 2 }, undefined)).toEqual(undefined);
  });

  // 特殊类型合并测试
  it('应该正确处理特殊类型', () => {
    const date = new Date();
    const regex = /test/;
    const target = { date: new Date(2000, 1, 1), regex: /old/ };
    const source = { date, regex };

    const result = merge(target, source);
    expect(result.date).toBe(date);
    expect(result.regex).toBe(regex);
  });

  // 原型链属性测试
  it('应该只合并自身的可枚举属性', () => {
    const proto = { inherited: true };
    const target = Object.create(proto);
    Object.defineProperty(target, 'nonEnum', {
      value: 1,
      enumerable: false,
    });
    target.own = 1;

    const source = { own: 2 };
    const result = merge(target, source);

    expect(result.own).toBe(2);
    expect(result.inherited).toBeUndefined();
    expect(Object.getOwnPropertyDescriptor(result, 'nonEnum')).toBeUndefined();
  });
});
