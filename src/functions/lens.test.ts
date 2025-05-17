import { describe, it, expect } from 'vitest';
import { lens, lensProp, lensPath, lensView, lensSet, lensOver, Lens } from './lens';

describe('lens', () => {
  describe('基本功能', () => {
    it('应该能创建和使用基本 lens', () => {
      const nameLens = lens(
        (obj: { name: string }) => obj.name,
        (name: string, obj: { name: string }) => ({ ...obj, name })
      );
      const obj = { name: 'Alice', age: 20 };

      expect(lensView(nameLens, obj)).toBe('Alice');
      expect(lensSet(nameLens, 'Bob', obj)).toEqual({ name: 'Bob', age: 20 });
      expect(lensOver(nameLens, name => name.toUpperCase(), obj)).toEqual({ name: 'ALICE', age: 20 });
    });

    it('应该支持柯里化调用', () => {
      const nameLens = lens(
        (obj: { name: string }) => obj.name,
        (name: string, obj: { name: string }) => ({ ...obj, name })
      );
      const obj = { name: 'Alice', age: 20 };

      const viewName = lensView(nameLens);
      const setName = lensSet(nameLens, 'Bob');
      const overName = lensOver(nameLens, name => name.toUpperCase());

      expect(viewName(obj)).toBe('Alice');
      expect(setName(obj)).toEqual({ name: 'Bob', age: 20 });
      expect(overName(obj)).toEqual({ name: 'ALICE', age: 20 });
    });
  });

  describe('lensProp', () => {
    it('应该能创建和使用属性 lens', () => {
      const nameLens = lensProp('name');
      const obj = { name: 'Alice', age: 20 };

      expect(lensView(nameLens, obj)).toBe('Alice');
      expect(lensSet(nameLens, 'Bob', obj)).toEqual({ name: 'Bob', age: 20 });
      expect(lensOver(nameLens, name => name.toUpperCase(), obj)).toEqual({ name: 'ALICE', age: 20 });
    });

    it('应该支持嵌套对象', () => {
      const userLens = lensProp('user');
      const obj = { user: { name: 'Alice', age: 20 } };

      expect(lensView(userLens, obj)).toEqual({ name: 'Alice', age: 20 });
      expect(lensSet(userLens, { name: 'Bob', age: 30 }, obj)).toEqual({ user: { name: 'Bob', age: 30 } });
    });
  });

  describe('lensPath', () => {
    it('应该能创建和使用路径 lens', () => {
      const nameLens = lensPath(['user', 'profile', 'name']);
      const obj = { user: { profile: { name: 'Alice' } } };

      expect(lensView(nameLens, obj)).toBe('Alice');
      expect(lensSet(nameLens, 'Bob', obj)).toEqual({ user: { profile: { name: 'Bob' } } });
      expect(lensOver(nameLens, name => name.toUpperCase(), obj)).toEqual({ user: { profile: { name: 'ALICE' } } });
    });

    it('应该支持数组索引', () => {
      const firstItemLens = lensPath(['items', 0]);
      const obj = { items: ['a', 'b', 'c'] };

      expect(lensView(firstItemLens, obj)).toBe('a');
      expect(lensSet(firstItemLens, 'x', obj)).toEqual({ items: ['x', 'b', 'c'] });
    });

    it('应该处理不存在的路径', () => {
      const nameLens = lensPath(['user', 'profile', 'name']);
      const obj = { user: {} };

      expect(lensView(nameLens, obj)).toBeUndefined();
      expect(lensSet(nameLens, 'Bob', obj)).toEqual({ user: { profile: { name: 'Bob' } } });
    });
  });

  describe('组合使用', () => {
    it('应该支持 lens 组合', () => {
      const userLens = lensProp('user');
      const nameLens = lensProp('name');
      const obj = { user: { name: 'Alice', age: 20 } };

      const userNameLens: Lens<typeof obj, string> = lens(
        obj => lensView(nameLens, lensView(userLens, obj)),
        (name, obj) => lensSet(userLens, lensSet(nameLens, name, lensView(userLens, obj)), obj)
      );

      expect(lensView(userNameLens, obj)).toBe('Alice');
      expect(lensSet(userNameLens, 'Bob', obj)).toEqual({ user: { name: 'Bob', age: 20 } });
    });

    it('应该支持多个转换操作', () => {
      const nameLens = lensProp('name');
      const obj = { name: 'Alice', age: 20 };

      const result = lensOver(
        nameLens,
        name => name.toUpperCase(),
        lensOver(nameLens, name => name + '!', obj)
      );

      expect(result).toEqual({ name: 'ALICE!', age: 20 });
    });
  });

  describe('边界情况', () => {
    it('应该处理空对象', () => {
      const nameLens = lensProp('name');
      const obj: Record<string, any> = {};

      expect(lensView(nameLens, obj)).toBeUndefined();
      expect(lensSet(nameLens, 'Bob', obj)).toEqual({ name: 'Bob' });
    });

    it('应该处理 null 和 undefined', () => {
      const nameLens = lensProp('name');
      const obj = { name: null };

      expect(lensView(nameLens, obj)).toBeNull();
      expect(lensSet(nameLens, undefined, obj)).toEqual({ name: undefined });
    });
  });
});
