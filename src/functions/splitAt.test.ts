import { describe, it, expect } from 'vitest';
import { splitAt } from './splitAt';

describe('splitAt', () => {
  it('应该在指定位置分割数组', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(splitAt(3, array)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });

  it('当index为0时应该返回空数组和原数组', () => {
    const array = [1, 2, 3] as const;
    expect(splitAt(0, array)).toEqual([[], [1, 2, 3]]);
  });

  it('当index等于数组长度时应该返回原数组和空数组', () => {
    const array = [1, 2, 3] as const;
    expect(splitAt(3, array)).toEqual([[1, 2, 3], []]);
  });

  it('当index大于数组长度时应该返回原数组和空数组', () => {
    const array = [1, 2, 3] as const;
    expect(splitAt(5, array)).toEqual([[1, 2, 3], []]);
  });

  it('当index为负数时应该返回空数组和原数组', () => {
    const array = [1, 2, 3] as const;
    expect(splitAt(-1, array)).toEqual([[], [1, 2, 3]]);
  });

  it('当数组为空时应该返回两个空数组', () => {
    const array = [] as const;
    expect(splitAt(0, array)).toEqual([[], []]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    splitAt(2, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const splitAt3 = splitAt(3);
    expect(splitAt3(array)).toEqual([
      [1, 2, 3],
      [4, 5],
    ]);
  });
});
