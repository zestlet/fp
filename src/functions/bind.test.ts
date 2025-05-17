import { describe, it, expect } from 'vitest';
import { bind } from './bind';

describe('bind', () => {
  it('应该能正确绑定函数的 this 上下文', () => {
    const obj = { value: 42 };
    const getValue = function (this: typeof obj) {
      return this.value;
    };
    const boundGetValue = bind(getValue, obj);
    expect(boundGetValue()).toBe(42);
  });

  it('应该能处理带参数的函数', () => {
    const obj = { value: 42 };
    const add = function (this: typeof obj, x: number) {
      return this.value + x;
    };
    const boundAdd = bind(add, obj);
    expect(boundAdd(8)).toBe(50);
  });

  it('应该能处理多个参数', () => {
    const obj = { value: 42 };
    const sum = function (this: typeof obj, x: number, y: number) {
      return this.value + x + y;
    };
    const boundSum = bind(sum, obj);
    expect(boundSum(8, 10)).toBe(60);
  });

  it('应该支持柯里化调用', () => {
    const obj = { value: 42 };
    const getValue = function (this: typeof obj) {
      return this.value;
    };
    const bindToObj = bind(getValue);
    const boundGetValue = bindToObj(obj);
    expect(boundGetValue()).toBe(42);
  });

  it('应该能处理类方法', () => {
    class Counter {
      private count = 0;
      increment() {
        return ++this.count;
      }
    }
    const counter = new Counter();
    const boundIncrement = bind(counter.increment, counter);
    expect(boundIncrement()).toBe(1);
    expect(boundIncrement()).toBe(2);
  });

  it('应该能处理箭头函数（保持原始 this）', () => {
    const obj = { value: 42 };
    const getValue = function (this: { value?: number }) {
      return this.value;
    };
    const boundGetValue = bind(getValue, obj);
    expect(boundGetValue()).toBe(42);
  });

  it('应该能处理构造函数', () => {
    class Person {
      constructor(
        public name: string,
        public age: number
      ) {}
    }
    const createPerson = function (this: typeof Person, name: string, age: number) {
      return new this(name, age);
    };
    const boundCreatePerson = bind(createPerson, Person);
    const person = boundCreatePerson('Alice', 20);
    expect(person).toBeInstanceOf(Person);
    expect(person.name).toBe('Alice');
    expect(person.age).toBe(20);
  });

  it('应该能处理原型方法', () => {
    class Animal {
      constructor(public name: string) {}
      getName() {
        return this.name;
      }
    }
    const animal = new Animal('Dog');
    const getName = bind(animal.getName, animal);
    expect(getName()).toBe('Dog');
  });
});
