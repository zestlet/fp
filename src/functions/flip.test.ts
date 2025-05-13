import { describe, expect, it } from 'vitest';
import { flip } from './flip';

describe('flip', () => {
  it('应该交换前两个参数', () => {
    const subtract = (a: number, b: number) => a - b;
    const flippedSubtract = flip(subtract);
    expect(subtract(5, 3)).toBe(2);
    expect(flippedSubtract(5, 3)).toBe(-2);
  });

  it('应该支持柯里化调用', () => {
    const subtract = (a: number, b: number) => a - b;
    const flippedSubtract = flip(subtract);
    expect(flippedSubtract(5, 3)).toBe(-2);
  });

  it('应该正确处理字符串操作', () => {
    const concat = (a: string, b: string) => a + b;
    const flippedConcat = flip(concat);
    expect(concat('hello', 'world')).toBe('helloworld');
    expect(flippedConcat('hello', 'world')).toBe('worldhello');
  });

  it('应该正确处理对象操作', () => {
    const merge = (a: { x: number }, b: { y: number }) => ({ ...a, ...b });
    const flippedMerge = flip(merge);
    const obj1 = { x: 1 };
    const obj2 = { y: 2 };
    expect(merge(obj1, obj2)).toEqual({ x: 1, y: 2 });
    expect(flippedMerge(obj2, obj1)).toEqual({ x: 1, y: 2 });
  });

  it('应该正确处理数组操作', () => {
    const concat = (a: number[], b: number[]) => [...a, ...b];
    const flippedConcat = flip(concat);
    const arr1 = [1, 2];
    const arr2 = [3, 4];
    expect(concat(arr1, arr2)).toEqual([1, 2, 3, 4]);
    expect(flippedConcat(arr1, arr2)).toEqual([3, 4, 1, 2]);
  });
});
