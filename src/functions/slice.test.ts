import { describe, it, expect } from 'vitest';
import { slice } from './slice';

describe('slice', () => {
  // 测试直接调用方式
  describe('直接调用 slice(start, end, data)', () => {
    it('应该正确返回指定范围的元素', () => {
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(slice(1, 4, numbers)).toEqual([2, 3, 4]);
    });

    it('应该处理负数索引', () => {
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(slice(-3, -1, numbers)).toEqual([3, 4]);
      expect(slice(-3, undefined, numbers)).toEqual([3, 4, 5]);
    });

    it('应该处理超出范围的索引', () => {
      const numbers = [1, 2, 3] as const;
      expect(slice(5, 10, numbers)).toEqual([]);
      expect(slice(-10, -5, numbers)).toEqual([]);
    });

    it('应该处理空数组', () => {
      const empty = [] as const;
      expect(slice(0, 1, empty)).toEqual([]);
      expect(slice(-1, 1, empty)).toEqual([]);
    });

    it('应该正确处理不同类型的数组', () => {
      const mixed = [1, '2', true, null] as const;
      expect(slice(1, 3, mixed)).toEqual(['2', true]);
    });

    it('应该处理开始索引大于结束索引的情况', () => {
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(slice(3, 1, numbers)).toEqual([]);
    });
  });

  // 测试函数式调用方式
  describe('函数式调用 slice(start)', () => {
    it('应该返回一个可以获取指定范围元素的函数', () => {
      const getMiddle = slice(1);
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(getMiddle(4, numbers)).toEqual([2, 3, 4]);
    });

    it('应该正确处理负数索引', () => {
      const getLastTwo = slice(-2);
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(getLastTwo(undefined, numbers)).toEqual([4, 5]);
    });

    it('应该保持函数式调用的独立性', () => {
      const getMiddle = slice(1);
      const numbers1 = [1, 2, 3] as const;
      const numbers2 = [4, 5, 6] as const;
      expect(getMiddle(3, numbers1)).toEqual([2, 3]);
      expect(getMiddle(3, numbers2)).toEqual([5, 6]);
    });

    it('应该处理超出范围的索引', () => {
      const getLast = slice(5);
      const numbers = [1, 2, 3] as const;
      expect(getLast(10, numbers)).toEqual([]);
    });
  });

  // 测试函数式调用方式（两个参数）
  describe('函数式调用 slice(start, end)', () => {
    it('应该返回一个可以获取指定范围元素的函数', () => {
      const getMiddle = slice(1, 4);
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(getMiddle(numbers)).toEqual([2, 3, 4]);
    });

    it('应该正确处理负数索引', () => {
      const getLastTwo = slice(-2, undefined);
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(getLastTwo(numbers)).toEqual([4, 5]);
    });

    it('应该保持函数式调用的独立性', () => {
      const getMiddle = slice(1, 3);
      const numbers1 = [1, 2, 3] as const;
      const numbers2 = [4, 5, 6] as const;
      expect(getMiddle(numbers1)).toEqual([2, 3]);
      expect(getMiddle(numbers2)).toEqual([5, 6]);
    });

    it('应该处理超出范围的索引', () => {
      const getLast = slice(5, 10);
      const numbers = [1, 2, 3] as const;
      expect(getLast(numbers)).toEqual([]);
    });
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5];
    const sliceFromOne = slice(1);
    const sliceFromOneToThree = sliceFromOne(3);
    const result = sliceFromOneToThree(array);
    expect(result).toEqual([2, 3]);

    // end为undefined时，返回从start到末尾的元素
    const sliceFromOneToEnd = sliceFromOne(undefined);
    const result2 = sliceFromOneToEnd(array);
    expect(result2).toEqual([2, 3, 4, 5]);
  });
});
