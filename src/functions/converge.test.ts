import { describe, it, expect } from 'vitest';
import { converge } from './converge';

describe('converge', () => {
  it('应该能正确应用分支函数并将结果传递给汇聚函数', () => {
    const add = (a: number, b: number) => a + b;
    const multiply = (a: number, b: number) => a * b;
    const subtract = (a: number, b: number) => a - b;

    const convergeFn = converge((sum, product, diff) => sum + product + diff, [add, multiply, subtract]);

    expect(convergeFn(2, 3)).toBe(10); // (2+3) + (2*3) + (2-3) = 5 + 6 + (-1) = 11
  });

  it('应该能处理字符串操作', () => {
    const toUpper = (s: string) => s.toUpperCase();
    const toLower = (s: string) => s.toLowerCase();
    const length = (s: string) => s.length;

    const convergeFn = converge((upper, lower, len) => `${upper}-${lower}-${len}`, [toUpper, toLower, length]);

    expect(convergeFn('Hello')).toBe('HELLO-hello-5');
  });

  it('应该能处理对象操作', () => {
    const getX = (obj: { x: number }) => obj.x;
    const getY = (obj: { y: number }) => obj.y;
    const getSum = (obj: { x: number; y: number }) => obj.x + obj.y;

    const convergeFn = converge((x, y, sum) => ({ x, y, sum }), [getX, getY, getSum]);

    expect(convergeFn({ x: 2, y: 3 })).toEqual({
      x: 2,
      y: 3,
      sum: 5,
    });
  });

  it('应该支持柯里化调用', () => {
    const add = (a: number, b: number) => a + b;
    const multiply = (a: number, b: number) => a * b;

    const convergeWithAdd = converge((sum, product) => sum + product);
    const convergeFn = convergeWithAdd([add, multiply]);

    expect(convergeFn(2, 3)).toBe(11); // (2+3) + (2*3) = 5 + 6 = 11
  });

  it('应该处理空分支函数数组', () => {
    const convergeFn = converge(() => 'result', []);

    expect(convergeFn(1, 2, 3)).toBe('result');
  });

  it('应该保持原始函数的类型安全', () => {
    const add = (a: number, b: number) => a + b;
    const multiply = (a: number, b: number) => a * b;

    const convergeFn = converge((sum, product) => sum + product, [add, multiply]);

    // @ts-expect-error 类型错误：参数类型不匹配
    expect(convergeFn('2', 3)).toBe('236');
  });

  it('应该能处理异步函数', async () => {
    const asyncAdd = async (a: number, b: number) => a + b;
    const asyncMultiply = async (a: number, b: number) => a * b;

    const convergeFn = converge(async (sum, product) => (await sum) + (await product), [asyncAdd, asyncMultiply]);

    const result = await convergeFn(2, 3);
    expect(result).toBe(11); // (2+3) + (2*3) = 5 + 6 = 11
  });
});
