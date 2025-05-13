import { describe, it, expect } from 'vitest';
import { swap } from './swap';

describe('swap', () => {
  it('应该交换数组中指定位置的元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(swap(0, 4, array)).toEqual([5, 2, 3, 4, 1]);
  });

  it('应该支持负数索引', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(swap(-1, -2, array)).toEqual([1, 2, 3, 5, 4]);
  });

  it('当索引超出范围时应该返回原数组的副本', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(swap(0, 10, array)).toEqual([...array]);
    expect(swap(-10, 0, array)).toEqual([...array]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(swap(0, 1, array)).toEqual([]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const swapFirstLast = swap(0, 4);
    expect(swapFirstLast(array)).toEqual([5, 2, 3, 4, 1]);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    expect(swap(0, 2, array)).toEqual([
      { id: 3, name: 'Charlie' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Alice' },
    ]);
  });
});
