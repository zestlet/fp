import { describe, it, expect, expectTypeOf } from 'vitest';
import { flow } from './flow';

describe('flow', () => {
  it('当没有参数时应该返回恒等函数', () => {
    const identity = flow();
    expect(identity(42)).toBe(42);
    expect(identity('hello')).toBe('hello');
    expect(identity({ x: 1 })).toEqual({ x: 1 });
  });

  it('当只有一个函数时应该返回该函数', () => {
    const double = (x: number) => x * 2;
    const flowed = flow(double);
    expect(flowed(5)).toBe(10);
  });

  it('应该正确组合两个函数', () => {
    const double = (x: number) => x * 2;
    const addOne = (x: number) => x + 1;
    const flowed = flow(double, addOne);
    expect(flowed(5)).toBe(11);
  });

  it('应该支持不同类型的函数组合', () => {
    const toString = (x: number) => x.toString();
    const toUpperCase = (x: string) => x.toUpperCase();
    const flowed = flow(toString, toUpperCase);
    expect(flowed(42)).toBe('42');
  });

  it('应该支持多个函数的组合', () => {
    const double = (x: number) => x * 2;
    const addOne = (x: number) => x + 1;
    const toString = (x: number) => x.toString() + 'a';
    const toUpperCase = (x: string) => x.toUpperCase();
    const flowed = flow(double, addOne, toString, toUpperCase);
    expect(flowed(5)).toBe('11A');
  });

  it('应该支持多参数函数', () => {
    const add = (x: number, y: number) => x + y;
    const double = (x: number) => x * 2;
    const flowed = flow(add, double);
    expect(flowed(2, 3)).toBe(10);
  });

  it('应该正确处理 this 绑定', () => {
    const obj = {
      value: 1,
      add(x: number) {
        return this.value + x;
      },
      double(x: number) {
        return x * 2;
      },
    };

    const flowed = flow(obj.add.bind(obj), obj.double);
    expect(flowed(2)).toBe(6);
  });

  it('应该支持对象转换', () => {
    const getValue = (obj: { value: number }) => obj.value;
    const double = (x: number) => x * 2;
    const createObject = (x: number) => ({ result: x });
    const flowed = flow(getValue, double, createObject);
    expect(flowed({ value: 5 })).toEqual({ result: 10 });
  });

  it('应该支持数组操作', () => {
    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    const double = (x: number) => x * 2;
    const flowed = flow(sum, double);
    expect(flowed([1, 2, 3, 4])).toBe(20);
  });

  it('应该支持泛型函数', () => {
    const map =
      <T>(fn: (x: T) => T) =>
      (arr: T[]): T[] =>
        arr.map(fn);
    const filter =
      <T>(predicate: (x: T) => boolean) =>
      (arr: T[]): T[] =>
        arr.filter(predicate);
    const reduce =
      <T>(fn: (acc: T, cur: T) => T, initial: T) =>
      (arr: T[]): T =>
        arr.reduce(fn, initial);

    const doubleNumbers = map<number>(x => x * 2);
    const filterEven = filter<number>(x => x % 2 === 0);
    const sum = reduce<number>((a, b) => a + b, 0);

    const flowed = flow(doubleNumbers, filterEven, sum);
    expect(flowed([1, 2, 3, 4, 5])).toBe(30); // [2,4,6,8,10] -> [2,4,6,8,10] -> 30

    function identity<T>(): (x: T) => T;
    function identity<T>(x: T): T;
    function identity<T>(x?: T) {
      if (arguments.length === 0) {
        return (x: T) => x;
      }
      return x as T;
    }
    const stringflowed = flow(
      identity<string[]>(),
      map(x => x.toUpperCase()),
      filter(x => x.length > 3),
      reduce((a, b) => a + b, '')
    );
    expect(stringflowed(['hi', 'hello', 'hey', 'world'])).toBe('HELLOWORLD');
  });

  it('空pipe入参情况', () => {
    const flowed = flow();
    expect(flowed(42)).toBe(42);
    expect(flowed('hello')).toBe('hello');
    expect(flowed({ x: 1 })).toEqual({ x: 1 });
  });

  it('单个入参情况', () => {
    const flowed = flow(x => x);
    expect(flowed(42)).toBe(42);
    expect(flowed('hello')).toBe('hello');
    expect(flowed({ x: 1 })).toEqual({ x: 1 });
  });

  it('小于20个入参情况', () => {
    const flowed = flow(
      <T>(x: T) => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x
    );
    expect(flowed(42)).toBe(42);
    expect(flowed('hello')).toBe('hello');
    expect(flowed({ x: 1 })).toEqual({ x: 1 });
  });
});
