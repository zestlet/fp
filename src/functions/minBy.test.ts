import { describe, it, expect } from 'vitest';
import { minBy } from './minBy';

interface TestItem {
  value: number;
}

describe('minBy', () => {
  it('应该根据指定的函数找出数组中的最小值', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(minBy((item: TestItem) => item.value, array)).toEqual({ value: 1 });
  });

  it('当数组为空时应该返回undefined', () => {
    const array: TestItem[] = [];
    expect(minBy((item: TestItem) => item.value, array)).toBeUndefined();
  });

  it('当数组只有一个元素时应该返回该元素', () => {
    const array: TestItem[] = [{ value: 5 }];
    expect(minBy((item: TestItem) => item.value, array)).toEqual({ value: 5 });
  });

  it('当数组包含负数时应该正确返回最小值', () => {
    const array: TestItem[] = [{ value: -1 }, { value: -5 }, { value: -3 }];
    expect(minBy((item: TestItem) => item.value, array)).toEqual({ value: -5 });
  });

  it('当数组包含重复的最小值时应该返回第一个最小值', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 1 }, { value: 2 }];
    expect(minBy((item: TestItem) => item.value, array)).toEqual({ value: 1 });
  });

  it('应该支持柯里化调用', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const minByValue = minBy((item: TestItem) => item.value);
    expect(minByValue(array)).toEqual({ value: 1 });
  });

  it('应该支持不同的转换函数', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(minBy((item: TestItem) => item.value * 2, array)).toEqual({ value: 1 });
  });
});
