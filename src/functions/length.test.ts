import { describe, it, expect, expectTypeOf } from 'vitest';
import { length } from './length';

// 类型测试
describe('类型测试', () => {
  it('应该正确推断返回类型', () => {
    // 直接调用方式
    const numbers = [1, 2, 3] as const;
    const result = length(numbers);
    expectTypeOf(result).toBeNumber();
  });

  it('应该正确处理只读数组', () => {
    const readonlyNumbers = [1, 2, 3] as const;
    const result = length(readonlyNumbers);
    expectTypeOf(result).toBeNumber();
  });

  it('应该正确处理混合类型数组', () => {
    const mixed = [1, '2', true] as const;
    const result = length(mixed);
    expectTypeOf<typeof result>().toBeNumber();
  });
});

describe('length', () => {
  // 测试直接调用方式
  describe('直接调用 length(data)', () => {
    it('应该正确返回数字数组的长度', () => {
      const numbers = [1, 2, 3, 4, 5] as const;
      expect(length(numbers)).toBe(5);
    });

    it('应该正确返回字符串数组的长度', () => {
      const strings = ['a', 'b', 'c'] as const;
      expect(length(strings)).toBe(3);
    });

    it('应该处理空数组', () => {
      const empty = [] as const;
      expect(length(empty)).toBe(0);
    });
  });
});
