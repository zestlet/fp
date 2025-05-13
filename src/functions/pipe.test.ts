import { describe, it, expect, expectTypeOf } from 'vitest';
import { pipe } from './pipe';

describe('pipe', () => {
  it('当没有参数时应该返回恒等函数', () => {
    const identity = pipe();
    expect(identity(42)).toBe(42);
    expect(identity('hello')).toBe('hello');
    expect(identity({ x: 1 })).toEqual({ x: 1 });
  });

  it('当只有一个函数时应该返回该函数', () => {
    const double = (x: number) => x * 2;
    const piped = pipe(double);
    expect(piped(5)).toBe(10);
  });

  it('应该正确组合两个函数', () => {
    const double = (x: number) => x * 2;
    const addOne = (x: number) => x + 1;
    const piped = pipe(double, addOne);
    expect(piped(5)).toBe(11);
  });

  it('应该支持不同类型的函数组合', () => {
    const toString = (x: number) => x.toString();
    const toUpperCase = (x: string) => x.toUpperCase();
    const piped = pipe(toString, toUpperCase);
    expect(piped(42)).toBe('42');
  });

  it('应该支持多个函数的组合', () => {
    const double = (x: number) => x * 2;
    const addOne = (x: number) => x + 1;
    const toString = (x: number) => x.toString() + 'a';
    const toUpperCase = (x: string) => x.toUpperCase();
    const piped = pipe(double, addOne, toString, toUpperCase);
    expect(piped(5)).toBe('11A');
  });

  it('应该支持多参数函数', () => {
    const add = (x: number, y: number) => x + y;
    const double = (x: number) => x * 2;
    const piped = pipe(add, double);
    expect(piped(2, 3)).toBe(10);
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

    const piped = pipe(obj.add.bind(obj), obj.double);
    expect(piped(2)).toBe(6);
  });

  it('应该支持对象转换', () => {
    const getValue = (obj: { value: number }) => obj.value;
    const double = (x: number) => x * 2;
    const createObject = (x: number) => ({ result: x });
    const piped = pipe(getValue, double, createObject);
    expect(piped({ value: 5 })).toEqual({ result: 10 });
  });

  it('应该支持数组操作', () => {
    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    const double = (x: number) => x * 2;
    const piped = pipe(sum, double);
    expect(piped([1, 2, 3, 4])).toBe(20);
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

    const piped = pipe(doubleNumbers, filterEven, sum);
    expect(piped([1, 2, 3, 4, 5])).toBe(30); // [2,4,6,8,10] -> [2,4,6,8,10] -> 30

    function identity<T>(): (x: T) => T;
    function identity<T>(x: T): T;
    function identity<T>(x?: T) {
      if (arguments.length === 0) {
        return (x: T) => x;
      }
      return x as T;
    }
    const stringPiped = pipe(
      identity<string[]>(),
      map(x => x.toUpperCase()),
      filter(x => x.length > 3),
      reduce((a, b) => a + b, '')
    );
    expect(stringPiped(['hi', 'hello', 'hey', 'world'])).toBe('HELLOWORLD');
  });

  it('空pipe入参情况', () => {
    const piped = pipe();
    expect(piped(42)).toBe(42);
    expect(piped('hello')).toBe('hello');
    expect(piped({ x: 1 })).toEqual({ x: 1 });
  });

  it('单个入参情况', () => {
    const piped = pipe(x => x);
    expect(piped(42)).toBe(42);
    expect(piped('hello')).toBe('hello');
    expect(piped({ x: 1 })).toEqual({ x: 1 });
  });

  it('小于20个入参情况', () => {
    const piped = pipe(
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
    expect(piped(42)).toBe(42);
    expect(piped('hello')).toBe('hello');
    expect(piped({ x: 1 })).toEqual({ x: 1 });
  });

  it('大于20个入参情况', () => {
    const piped = pipe(
      <T extends number>(_: T) => 1,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      x => x,
      (x: number) => x + 1,
      x => x + 1
    );

    expectTypeOf<ReturnType<typeof piped>>().toBeAny();
    expect(piped(42)).toBe(3);
  });
});
