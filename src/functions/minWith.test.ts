import { describe, it, expect } from 'vitest';
import { minWith } from './minWith';

interface TestItem {
  value: number;
}

describe('minWith', () => {
  it('应该使用自定义比较函数找出数组中的最小值', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(minWith((a: TestItem, b: TestItem) => a.value - b.value, array)).toEqual({ value: 1 });
  });

  it('当数组为空时应该返回undefined', () => {
    const array: TestItem[] = [];
    expect(minWith((a: TestItem, b: TestItem) => a.value - b.value, array)).toBeUndefined();
  });

  it('当数组只有一个元素时应该返回该元素', () => {
    const array: TestItem[] = [{ value: 5 }];
    expect(minWith((a: TestItem, b: TestItem) => a.value - b.value, array)).toEqual({ value: 5 });
  });

  it('当数组包含负数时应该正确返回最小值', () => {
    const array: TestItem[] = [{ value: -1 }, { value: -5 }, { value: -3 }];
    expect(minWith((a: TestItem, b: TestItem) => a.value - b.value, array)).toEqual({ value: -5 });
  });

  it('当数组包含重复的最小值时应该返回第一个最小值', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 1 }, { value: 2 }];
    expect(minWith((a: TestItem, b: TestItem) => a.value - b.value, array)).toEqual({ value: 1 });
  });

  it('应该支持柯里化调用', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const minWithValue = minWith((a: TestItem, b: TestItem) => a.value - b.value);
    expect(minWithValue(array)).toEqual({ value: 1 });
  });

  it('应该支持不同的比较函数', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(minWith((a: TestItem, b: TestItem) => b.value - a.value, array)).toEqual({ value: 3 });
  });
});
