import { describe, it, expect } from 'vitest';
import { flowAsync } from './flowAsync';

describe('flowAsync', () => {
  it('当没有参数时应该返回一个返回输入值的异步函数', async () => {
    const fn = flowAsync();
    expect(await fn(42)).toBe(42);
    expect(await fn('hello')).toBe('hello');
    expect(await fn({ x: 1 })).toEqual({ x: 1 });
  });

  it('当只有一个函数时应该返回该函数', async () => {
    const double = async (x: number) => x * 2;
    const fn = flowAsync(double);
    expect(await fn(5)).toBe(10);
  });

  it('应该正确组合两个异步函数', async () => {
    const double = async (x: number) => x * 2;
    const addOne = async (x: number) => x + 1;
    const fn = flowAsync(double, addOne);
    expect(await fn(5)).toBe(11);
  });

  it('应该支持不同类型的异步函数组合', async () => {
    const toString = async (x: number) => x.toString();
    const toUpperCase = async (x: string) => x.toUpperCase();
    const fn = flowAsync(toString, toUpperCase);
    expect(await fn(42)).toBe('42');
  });

  it('应该支持多个异步函数的组合', async () => {
    const double = async (x: number) => x * 2;
    const addOne = async (x: number) => x + 1;
    const toString = async (x: number) => x.toString();
    const toUpperCase = async (x: string) => x.toUpperCase();
    const fn = flowAsync(double, addOne, toString, toUpperCase);
    expect(await fn(5)).toBe('11');
  });

  it('应该支持柯里化的异步函数', async () => {
    const add = (x: number) => async (y: number) => x + y;
    const double = async (x: number) => x * 2;
    const fn = flowAsync(add(3), double);
    expect(await fn(2)).toBe(10);
  });

  it('应该正确处理 this 绑定', async () => {
    const obj = {
      value: 1,
      async add(x: number) {
        return this.value + x;
      },
      async double(x: number) {
        return x * 2;
      },
    };

    const fn = flowAsync(obj.add.bind(obj), obj.double);
    expect(await fn(2)).toBe(6);
  });

  it('应该支持对象转换', async () => {
    const getValue = async (obj: { value: number }) => obj.value;
    const double = async (x: number) => x * 2;
    const createObject = async (x: number) => ({ result: x });
    const fn = flowAsync(getValue, double, createObject);
    expect(await fn({ value: 5 })).toEqual({ result: 10 });
  });

  it('应该支持数组操作', async () => {
    const sum = async (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    const double = async (x: number) => x * 2;
    const fn = flowAsync(sum, double);
    expect(await fn([1, 2, 3, 4])).toBe(20);
  });

  it('应该支持泛型函数', async () => {
    const map =
      <T>(fn: (x: T) => T) =>
      async (arr: T[]): Promise<T[]> =>
        arr.map(fn);
    const filter =
      <T>(predicate: (x: T) => boolean) =>
      async (arr: T[]): Promise<T[]> =>
        arr.filter(predicate);
    const reduce =
      <T>(fn: (acc: T, cur: T) => T, initial: T) =>
      async (arr: T[]): Promise<T> =>
        arr.reduce(fn, initial);

    const doubleNumbers = map<number>(x => x * 2);
    const filterEven = filter<number>(x => x % 2 === 0);
    const sum = reduce<number>((a, b) => a + b, 0);

    const fn = flowAsync(doubleNumbers, filterEven, sum);
    expect(await fn([1, 2, 3, 4, 5])).toBe(30);
  });

  it('应该正确处理异步函数中的错误', async () => {
    const throwError = async () => {
      throw new Error('test error');
    };
    const fn = flowAsync(throwError);
    await expect(fn()).rejects.toThrow('test error');
  });
});
