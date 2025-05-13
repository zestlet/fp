import { describe, it, expect } from 'vitest';
import { compose } from './compose';

describe('compose', () => {
  it('当没有参数时应该返回一个恒等函数', () => {
    const fn = compose();
    expect(fn(42)).toBe(42);
  });

  it('当只有一个函数时应该返回该函数', () => {
    const double = (x: number) => x * 2;
    const fn = compose(double);
    expect(fn(21)).toBe(42);
  });

  it('应该正确组合两个函数', () => {
    const double = (x: number) => x * 2;
    const add = (x: number) => x + 1;
    const fn = compose(double, add);
    expect(fn(20)).toBe(42);
  });

  it('应该支持不同类型的函数组合', () => {
    const toString = (x: number) => x.toString();
    const length = (x: string) => x.length;
    const fn = compose(length, toString);
    expect(fn(42)).toBe(2);
  });

  it('应该支持多个函数组合', () => {
    const double = (x: number) => x * 2;
    const add = (x: number) => x + 1;
    const square = (x: number) => x * x;
    const fn = compose(square, add, double);
    expect(fn(4)).toBe(81);
  });

  it('应该支持柯里化函数', () => {
    const add = (x: number) => (y: number) => x + y;
    const double = (x: number) => x * 2;
    const fn = compose(double, add(3));
    expect(fn(2)).toBe(10);
  });

  it('应该正确处理 this 绑定', () => {
    const obj = {
      value: 2,
      multiply(x: number) {
        return x * this.value;
      },
    };
    const double = (x: number) => x * 2;
    const fn = compose(double, obj.multiply.bind(obj));
    expect(fn(10)).toBe(40);
  });

  it('应该支持对象转换', () => {
    const toUpper = (x: string) => x.toUpperCase();
    const getLength = (x: string) => x.length;
    const fn = compose(getLength, toUpper);
    expect(fn('hello')).toBe(5);
  });

  it('应该支持数组操作', () => {
    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    const double = (arr: number[]) => arr.map(x => x * 2);
    const fn = compose(sum, double);
    expect(fn([1, 2, 3])).toBe(12);
  });

  it('应该支持泛型函数', () => {
    const identity = <T>(x: T) => x;
    const fn = compose(identity);
    expect(fn(42)).toBe(42);
    expect(fn('hello')).toBe('hello');
  });

  it('应该支持超过20个函数的组合', () => {
    const functions: ((x: number) => number)[] = [];
    for (let i = 0; i < 25; i++) {
      functions.push((x: number) => x + i);
    }
    const fn = compose(...functions);
    expect(fn(0)).toBe(300);
  });

  it('应该正确处理函数中的错误', () => {
    const error = new Error('test error');
    const throwError = () => {
      throw error;
    };
    const fn = compose(throwError);
    expect(() => fn()).toThrow('test error');
  });
});
