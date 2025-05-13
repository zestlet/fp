import { describe, it, expect } from 'vitest';
import { sumBy } from './sumBy';

interface TestItem {
  value: number;
}

describe('sumBy', () => {
  it('应该根据指定的函数计算数组元素的总和', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(sumBy((item: TestItem) => item.value, array)).toBe(6);
  });

  it('当数组为空时应该返回0', () => {
    const array: TestItem[] = [];
    expect(sumBy((item: TestItem) => item.value, array)).toBe(0);
  });

  it('当数组只有一个元素时应该返回该元素的值', () => {
    const array: TestItem[] = [{ value: 5 }];
    expect(sumBy((item: TestItem) => item.value, array)).toBe(5);
  });

  it('当数组包含负数时应该正确计算总和', () => {
    const array: TestItem[] = [{ value: -1 }, { value: 2 }, { value: -3 }];
    expect(sumBy((item: TestItem) => item.value, array)).toBe(-2);
  });

  it('应该支持柯里化调用', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    const sumByValue = sumBy((item: TestItem) => item.value);
    expect(sumByValue(array)).toBe(6);
  });

  it('应该支持不同的转换函数', () => {
    const array: TestItem[] = [{ value: 1 }, { value: 2 }, { value: 3 }];
    expect(sumBy((item: TestItem) => item.value * 2, array)).toBe(12);
  });
});
