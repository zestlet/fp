import { describe, it, expect } from 'vitest';
import { maxBy } from './maxBy';

interface TestItem {
  value: number;
}

describe('maxBy', () => {
  it('应该根据指定的函数找出数组中的最大值', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(maxBy((item: TestItem) => item.value, array)).toEqual({ value: 3 });
  });

  it('当数组为空时应该返回undefined', () => {
    const array: TestItem[] = [];
    expect(maxBy((item: TestItem) => item.value, array)).toBeUndefined();
  });

  it('当数组只有一个元素时应该返回该元素', () => {
    const array: TestItem[] = [{ value: 5 }];
    expect(maxBy((item: TestItem) => item.value, array)).toEqual({ value: 5 });
  });

  it('当数组包含负数时应该正确返回最大值', () => {
    const array: TestItem[] = [{ value: -1 }, { value: -5 }, { value: -3 }];
    expect(maxBy((item: TestItem) => item.value, array)).toEqual({ value: -1 });
  });

  it('当数组包含重复的最大值时应该返回第一个最大值', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 3 }, { value: 3 }];
    expect(maxBy((item: TestItem) => item.value, array)).toEqual({ value: 3 });
  });

  it('应该支持柯里化调用', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const maxByValue = maxBy((item: TestItem) => item.value);
    expect(maxByValue(array)).toEqual({ value: 3 });
  });

  it('应该支持不同的转换函数', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(maxBy((item: TestItem) => item.value * 2, array)).toEqual({ value: 3 });
  });
});
