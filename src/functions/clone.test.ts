import { describe, it, expect } from 'vitest';
import { clone } from './clone';

describe('clone', () => {
  it('应该创建对象的浅拷贝', () => {
    const obj = { name: 'John', age: 30 };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  it('应该支持柯里化调用', () => {
    const obj = { name: 'John', age: 30 };
    const cloneObj = clone;
    const cloned = cloneObj(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
  });

  it('应该支持不同类型的属性值', () => {
    const obj = {
      str: 'string',
      num: 123,
      bool: true,
      arr: [1, 2, 3],
      obj: { x: 1 },
      fn: () => {},
      sym: Symbol('test'),
    };
    const cloned = clone(obj);
    expect(cloned).toEqual(obj);
    expect(cloned).not.toBe(obj);
    expect(cloned.arr).toBe(obj.arr); // 浅拷贝，数组引用相同
    expect(cloned.obj).toBe(obj.obj); // 浅拷贝，对象引用相同
  });

  it('应该保持原始对象的属性顺序', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const cloned = clone(obj);
    expect(Object.keys(cloned)).toEqual(Object.keys(obj));
  });

  it('应该正确处理空对象', () => {
    const obj = {};
    const cloned = clone(obj);
    expect(cloned).toEqual({});
    expect(cloned).not.toBe(obj);
  });

  it('应该正确处理原型链', () => {
    const proto = { protoProp: 'proto' };
    const obj = Object.create(proto);
    obj.ownProp = 'own';
    const cloned = clone(obj);
    expect(cloned).toEqual({ ownProp: 'own' });
    expect(Object.getPrototypeOf(cloned)).toBe(Object.prototype);
  });
});
