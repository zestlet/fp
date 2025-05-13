import { describe, it, expect } from 'vitest';
import { nth } from './nth';

describe('nth', () => {
  // 测试直接调用方式
  describe('直接调用 nth(index, data)', () => {
    it('应该正确返回指定索引的元素', () => {
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(nth(2, numbers)).toBe(3);
    });

    it('应该处理负数索引', () => {
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(nth(-1, numbers)).toBe(5);
      expect(nth(-2, numbers)).toBe(4);
    });

    it('应该处理超出范围的索引', () => {
      const numbers = [1, 2, 3] as const;
      expect(nth(5, numbers)).toBeUndefined();
      expect(nth(-5, numbers)).toBeUndefined();
    });

    it('应该处理空数组', () => {
      const empty = [] as const;
      expect(nth(0, empty)).toBeUndefined();
      expect(nth(-1, empty)).toBeUndefined();
    });

    it('应该正确处理不同类型的数组', () => {
      const mixed = [1, '2', true] as const;
      expect(nth(0, mixed)).toBe(1);
      expect(nth(1, mixed)).toBe('2');
      expect(nth(2, mixed)).toBe(true);
    });
  });

  // 测试函数式调用方式
  describe('函数式调用 nth(index)', () => {
    it('应该返回一个可以获取指定索引元素的函数', () => {
      const getSecond = nth(1);
      const numbers = [1, 2, 3] as const;
      expect(getSecond(numbers)).toBe(2);
    });

    it('应该正确处理负数索引', () => {
      const getLast = nth(-1);
      const numbers = [1, 2, 3] as const;
      expect(getLast(numbers)).toBe(3);
    });

    it('应该保持函数式调用的独立性', () => {
      const getSecond = nth(1);
      const numbers1 = [1, 2, 3] as const;
      const numbers2 = [4, 5, 6] as const;
      expect(getSecond(numbers1)).toBe(2);
      expect(getSecond(numbers2)).toBe(5);
    });

    it('应该处理超出范围的索引', () => {
      const getFifth = nth(4);
      const numbers = [1, 2, 3] as const;
      expect(getFifth(numbers)).toBeUndefined();
    });
  });
});
