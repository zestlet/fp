import { describe, it, expect } from 'vitest';
import { composeAsync } from './composeAsync';

describe('composeAsync', () => {
  it('当没有参数时应该返回一个异步恒等函数', async () => {
    const fn = composeAsync();
    expect(await fn(42)).toBe(42);
  });

  it('当只有一个函数时应该返回该函数', async () => {
    const double = async (x: number) => x * 2;
    const fn = composeAsync(double);
    expect(await fn(21)).toBe(42);
  });

  it('应该正确组合两个异步函数', async () => {
    const double = async (x: number) => x * 2;
    const add = async (x: number) => x + 1;
    const fn = composeAsync(double, add);
    expect(await fn(20)).toBe(42);
  });

  it('应该支持不同类型的函数组合', async () => {
    const toString = async (x: number) => x.toString();
    const length = async (x: string) => x.length;
    const fn = composeAsync(length, toString);
    expect(await fn(42)).toBe(2);
  });

  it('应该支持多个异步函数组合', async () => {
    const double = async (x: number) => x * 2;
    const add = async (x: number) => x + 1;
    const square = async (x: number) => x * x;
    const fn = composeAsync(square, add, double);
    expect(await fn(4)).toBe(81);
  });

  it('应该支持柯里化函数', async () => {
    const add = (x: number) => async (y: number) => x + y;
    const double = async (x: number) => x * 2;
    const fn = composeAsync(double, add(3));
    expect(await fn(2)).toBe(10);
  });

  it('应该正确处理 this 绑定', async () => {
    const obj = {
      value: 2,
      async multiply(x: number) {
        return x * this.value;
      },
    };
    const double = async (x: number) => x * 2;
    const fn = composeAsync(double, obj.multiply.bind(obj));
    expect(await fn(10)).toBe(40);
  });

  it('应该支持对象转换', async () => {
    const toUpper = async (x: string) => x.toUpperCase();
    const getLength = async (x: string) => x.length;
    const fn = composeAsync(getLength, toUpper);
    expect(await fn('hello')).toBe(5);
  });

  it('应该支持数组操作', async () => {
    const sum = async (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    const double = async (arr: number[]) => arr.map(x => x * 2);
    const fn = composeAsync(sum, double);
    expect(await fn([1, 2, 3])).toBe(12);
  });

  it('应该支持泛型函数', async () => {
    const identity = async <T>(x: T) => x;
    const fn = composeAsync(identity);
    expect(await fn(42)).toBe(42);
    expect(await fn('hello')).toBe('hello');
  });

  it('应该支持超过20个函数的组合', async () => {
    const functions: ((x: number) => Promise<number>)[] = [];
    for (let i = 0; i < 25; i++) {
      functions.push(async (x: number) => x + i);
    }
    const fn = composeAsync(...functions);
    expect(await fn(0)).toBe(300);
  });

  it('应该正确处理异步函数中的错误', async () => {
    const error = new Error('test error');
    const throwError = async () => {
      throw error;
    };
    const fn = composeAsync(throwError);
    await expect(fn()).rejects.toThrow('test error');
  });
});
