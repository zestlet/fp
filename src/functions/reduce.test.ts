import { describe, it, expect } from 'vitest';
import { reduce } from './reduce';

describe('reduce', () => {
  it('应该正确累加数字数组', () => {
    const numbers = [1, 2, 3, 4, 5] as const;
    const sum = (acc: number, value: number) => acc + value;
    const result = reduce(sum, 0, numbers);
    expect(result).toBe(15);
  });

  it('应该正确处理空数组', () => {
    const numbers: readonly number[] = [];
    const sum = (acc: number, value: number) => acc + value;
    const result = reduce(sum, 0, numbers);
    expect(result).toBe(0);
  });

  it('应该保持原数组不变', () => {
    const numbers = [1, 2, 3] as const;
    const sum = (acc: number, value: number) => acc + value;
    reduce(sum, 0, numbers);
    expect(numbers).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用 - 先传入 reducer', () => {
    const numbers = [1, 2, 3, 4, 5] as const;
    const sum = (acc: number, value: number) => acc + value;
    const reduceWithSum = reduce(sum);
    const result = reduceWithSum(0, numbers);
    expect(result).toBe(15);
  });

  it('应该支持柯里化调用 - 先传入 reducer 和初始值', () => {
    const numbers = [1, 2, 3, 4, 5] as const;
    const sum = (acc: number, value: number) => acc + value;
    const reduceWithSumAndInit = reduce(sum, 0);
    const result = reduceWithSumAndInit(numbers);
    expect(result).toBe(15);
  });

  it('应该支持字符串拼接', () => {
    const strings = ['a', 'b', 'c'] as const;
    const concat = (acc: string, value: string) => acc + value;
    const result = reduce(concat, '', strings);
    expect(result).toBe('abc');
  });

  it('应该支持对象合并', () => {
    const objects = [{ a: 1 }, { b: 2 }, { c: 3 }] as const;
    const merge = (acc: Record<string, number>, value: Record<string, number>) => ({ ...acc, ...value });
    const result = reduce(merge, {}, objects);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('应该支持使用索引和原数组', () => {
    const numbers = [1, 2, 3] as const;
    const result = reduce(
      (acc: Record<number, { value: number; isLast: boolean }>, value: number, index: number, array: readonly number[]) => ({
        ...acc,
        [index]: { value, isLast: index === array.length - 1 },
      }),
      {} as Record<number, { value: number; isLast: boolean }>,
      numbers
    );
    expect(result).toEqual({
      0: { value: 1, isLast: false },
      1: { value: 2, isLast: false },
      2: { value: 3, isLast: true },
    });
  });
});
