import { describe, it, expect, expectTypeOf } from 'vitest';
import { map } from './map';

// 类型测试
describe('类型测试', () => {
  it('应该正确推断返回类型', () => {
    // 直接调用方式
    const numbers = [1, 2, 3] as const;
    const doubled = map(n => n * 2, numbers);
    expectTypeOf(doubled).toBeArray();
    expectTypeOf(doubled[0]).toBeNumber();

    // 函数式调用方式
    const double = map((n: number) => n * 2);
    const result = double(numbers);
    expectTypeOf(result).toBeArray();
    expectTypeOf(result[0]).toBeNumber();
  });

  it('应该正确处理混合类型', () => {
    const mixed = [1, '2', true] as const;
    const result = map(item => String(item), mixed);
    expectTypeOf(result).toBeArray();
    expectTypeOf(result[0]).toBeString();
  });

  it('应该正确处理只读数组', () => {
    const readonlyNumbers = [1, 2, 3] as const;
    const doubled = map(n => n * 2, readonlyNumbers);
    expectTypeOf(doubled).toBeArray();
    expectTypeOf(doubled[0]).toBeNumber();
  });

  it('应该正确处理复杂对象类型', () => {
    type User = { id: number; name: string };
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ] as const;
    const names = map(user => user.name, users);
    expectTypeOf(names).toBeArray();
    expectTypeOf(names[0]).toBeString();
  });

  it('应该正确处理函数式调用的类型', () => {
    const toString = map(n => String(n));
    expectTypeOf(toString).toBeFunction();
    const result = toString([1, 2, 3]);
    expectTypeOf(result).toBeArray();
    expectTypeOf(result[0]).toBeString();
  });
});

describe('map', () => {
  // 测试直接调用方式
  describe('直接调用 map(callbackfn, data)', () => {
    it('应该正确映射数字数组', () => {
      const numbers = [1, 2, 3, 4, 5] as const;
      const doubled = map(n => n * 2, numbers);
      expect(doubled).toEqual([2, 4, 6, 8, 10]);
    });

    it('应该正确映射字符串数组', () => {
      const strings = ['a', 'b', 'c'] as const;
      const uppercased = map(s => s.toUpperCase(), strings);
      expect(uppercased).toEqual(['A', 'B', 'C']);
    });

    it('应该正确传递索引和原数组', () => {
      const numbers = [1, 2, 3] as const;
      const result = map(
        (value, index, array) => ({
          value,
          index,
          isLast: index === array.length - 1,
        }),
        numbers
      );
      expect(result).toEqual([
        { value: 1, index: 0, isLast: false },
        { value: 2, index: 1, isLast: false },
        { value: 3, index: 2, isLast: true },
      ]);
    });

    it('应该处理空数组', () => {
      const empty = [] as const;
      const result = map(n => n * 2, empty);
      expect(result).toEqual([]);
    });
  });

  // 测试函数式调用方式
  describe('函数式调用 map(callbackfn)', () => {
    it('应该返回一个可以映射数组的函数', () => {
      const double = map((n: number) => n * 2);
      const numbers = [1, 2, 3] as const;
      expect(double(numbers)).toEqual([2, 4, 6]);
    });

    it('应该正确处理不同类型的数组', () => {
      const toString = map(n => String(n));
      const numbers = [1, 2, 3] as const;
      expect(toString(numbers)).toEqual(['1', '2', '3']);
    });

    it('应该保持函数式调用的独立性', () => {
      const addIndex = map((n: number, i) => n + i);
      const numbers = [1, 2, 3] as const;
      expect(addIndex(numbers)).toEqual([1, 3, 5]);
    });
  });

  // 测试类型安全
  describe('类型安全', () => {
    it('应该正确处理只读数组', () => {
      const readonlyNumbers = [1, 2, 3] as const;
      const doubled = map(n => n * 2, readonlyNumbers);
      expect(doubled).toEqual([2, 4, 6]);
    });

    it('应该正确处理混合类型数组', () => {
      const mixed = [1, '2', true] as const;
      const result = map(item => String(item), mixed);
      expect(result).toEqual(['1', '2', 'true']);
    });
  });
});
