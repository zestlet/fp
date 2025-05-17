import { describe, it, expect } from 'vitest';
import { call } from './call';

describe('call', () => {
  it('应该能正确调用函数并传递参数', () => {
    const add = (a: number, b: number) => a + b;
    expect(call(add, [1, 2])).toBe(3);
  });

  it('应该能处理字符串参数', () => {
    const greet = (name: string, greeting: string) => `${greeting}, ${name}!`;
    expect(call(greet, ['Alice', 'Hello'])).toBe('Hello, Alice!');
  });

  it('应该能处理对象参数', () => {
    const merge = (a: { x: number }, b: { y: number }) => ({ ...a, ...b });
    expect(call(merge, [{ x: 1 }, { y: 2 }])).toEqual({ x: 1, y: 2 });
  });

  it('应该支持柯里化调用', () => {
    const add = (a: number, b: number) => a + b;
    const addWithCall = call(add);
    expect(addWithCall([1, 2])).toBe(3);
  });

  it('应该能处理无参数函数', () => {
    const getValue = () => 42;
    expect(call(getValue, [])).toBe(42);
  });

  it('应该能处理可变参数函数', () => {
    const sum = (...numbers: number[]) => numbers.reduce((a, b) => a + b, 0);
    expect(call(sum, [1, 2, 3, 4])).toBe(10);
  });

  it('应该保持原始函数的类型安全', () => {
    const add = (a: number, b: number) => a + b;
    // @ts-expect-error 类型错误：参数类型不匹配
    const result = call(add, ['1', 2]);
    expect(result).toBe('12');
  });

  it('应该能处理异步函数', async () => {
    const asyncAdd = async (a: number, b: number) => a + b;
    const result = await call(asyncAdd, [1, 2]);
    expect(result).toBe(3);
  });

  it('应该能处理构造函数', () => {
    class Person {
      constructor(
        public name: string,
        public age: number
      ) {}
    }
    const createPerson = (name: string, age: number) => new Person(name, age);
    const person = call(createPerson, ['Alice', 20]);
    expect(person).toBeInstanceOf(Person);
    expect(person.name).toBe('Alice');
    expect(person.age).toBe(20);
  });
});
