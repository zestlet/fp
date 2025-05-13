import { describe, it, expect } from 'vitest';
import { pick } from './pick';

describe('pick', () => {
  it('应该从对象中选取指定的属性', () => {
    const obj = { name: 'John', age: 30, city: 'New York' };
    expect(pick(['name', 'age'], obj)).toEqual({ name: 'John', age: 30 });
  });

  it('应该支持柯里化调用', () => {
    const obj = { name: 'John', age: 30, city: 'New York' };
    const pickNameAndAge = pick(['name', 'age']);
    expect(pickNameAndAge(obj)).toEqual({ name: 'John', age: 30 });
  });

  it('应该忽略不存在的属性', () => {
    const obj = { name: 'John', age: 30 } as const;
    expect(pick(['name', 'city' as keyof typeof obj], obj)).toEqual({ name: 'John' });
  });

  it('应该返回空对象当没有属性被选中时', () => {
    const obj = { name: 'John', age: 30 };
    expect(pick([], obj)).toEqual({});
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
    expect(pick(['str', 'num', 'bool'], obj)).toEqual({
      str: 'string',
      num: 123,
      bool: true,
    });
  });

  it('应该保持原始对象的属性顺序', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 } as const;
    const result = pick(['c', 'a'], obj);
    expect(Object.keys(result)).toEqual(['c', 'a']);
  });
});
