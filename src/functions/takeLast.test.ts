import { describe, it, expect } from 'vitest';
import { takeLast } from './takeLast';

describe('takeLast', () => {
  it('应该获取数组的最后n个元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(takeLast(3, array)).toEqual([3, 4, 5]);
  });

  it('当n大于数组长度时应该返回整个数组', () => {
    const array = [1, 2, 3] as const;
    expect(takeLast(5, array)).toEqual([1, 2, 3]);
  });

  it('当n为0时应该返回空数组', () => {
    const array = [1, 2, 3] as const;
    expect(takeLast(0, array)).toEqual([]);
  });

  it('当n为负数时应该返回空数组', () => {
    const array = [1, 2, 3] as const;
    expect(takeLast(-1, array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    takeLast(2, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const takeLast3 = takeLast(3);
    expect(takeLast3(array)).toEqual([3, 4, 5]);
  });
});
