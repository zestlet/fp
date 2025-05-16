import { describe, it, expect } from 'vitest';
import { pipe } from './pipe';

describe('pipe', () => {
  // 基本功能测试
  it('should pass data through a single function', () => {
    const addOne = (x: number) => x + 1;
    const result = pipe(1, addOne);
    expect(result).toBe(2);
  });

  it('should pass data through multiple functions in order', () => {
    const addOne = (x: number) => x + 1;
    const double = (x: number) => x * 2;
    const toString = (x: number) => x.toString();

    const result = pipe(1, addOne, double, toString);
    expect(result).toBe('4');
  });

  // 类型转换测试
  it('should handle type transformations correctly', () => {
    const numToString = (x: number) => x.toString();
    const stringToArray = (x: string) => x.split('');
    const arrayToLength = (x: string[]) => x.length;

    const result = pipe(123, numToString, stringToArray, arrayToLength);
    expect(result).toBe(3);
  });

  // 边界情况测试
  it('should return input when no functions are provided', () => {
    const input = { value: 42 };
    const result = pipe(input);
    expect(result).toBe(input);
  });

  // 复杂对象处理测试
  it('should handle complex object transformations', () => {
    interface User {
      name: string;
      age: number;
    }

    const user: User = { name: 'John', age: 30 };
    const addTitle = (u: User) => ({ ...u, title: `Mr. ${u.name}` });
    const calculateRetirement = (u: ReturnType<typeof addTitle>) => ({
      ...u,
      yearsToRetirement: 65 - u.age,
    });

    const result = pipe(user, addTitle, calculateRetirement);
    expect(result).toEqual({
      name: 'John',
      age: 30,
      title: 'Mr. John',
      yearsToRetirement: 35,
    });
  });

  // 数组操作测试
  it('should handle array operations', () => {
    const numbers = [1, 2, 3, 4, 5];
    const double = (arr: number[]) => arr.map(x => x * 2);
    const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
    const toString = (x: number) => `Total: ${x}`;

    const result = pipe(numbers, double, sum, toString);
    expect(result).toBe('Total: 30');
  });

  // 异常处理测试
  it('should propagate errors through the pipeline', () => {
    const throwError = () => {
      throw new Error('Test error');
    };

    expect(() => {
      pipe(
        1,
        x => x + 1,
        throwError,
        x => x * 2
      );
    }).toThrow('Test error');
  });

  // 函数组合的类型安全测试
  it('should maintain type safety through the pipeline', () => {
    const addOne = (x: number) => x + 1;
    const toString = (x: number) => x.toString();
    const length = (x: string) => x.length;

    // 这个测试主要是为了验证类型系统，如果能编译通过就说明类型是安全的
    const result = pipe(1, addOne, toString, length);
    expect(typeof result).toBe('number');
    expect(result).toBe(1); // "2" 的长度是 1
  });
});
