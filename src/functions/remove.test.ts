import { describe, it, expect } from 'vitest';
import { remove } from './remove';

describe('remove', () => {
  it('应该删除指定位置的元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(remove(2, array)).toEqual([1, 2, 4, 5]);
  });

  it('当索引为负数时应该从末尾开始计算', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(remove(-2, array)).toEqual([1, 2, 3, 5]);
  });

  it('当索引为0时应该删除第一个元素', () => {
    const array = [1, 2, 3] as const;
    expect(remove(0, array)).toEqual([2, 3]);
  });

  it('当索引为最后一个元素时应该删除最后一个元素', () => {
    const array = [1, 2, 3] as const;
    expect(remove(2, array)).toEqual([1, 2]);
  });

  it('当索引超出数组长度时应该返回原数组', () => {
    const array = [1, 2, 3] as const;
    expect(remove(5, array)).toEqual([1, 2, 3]);
  });

  it('当索引为负数且超出数组长度时应该返回原数组', () => {
    const array = [1, 2, 3] as const;
    expect(remove(-5, array)).toEqual([1, 2, 3]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(remove(0, array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    remove(1, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3] as const;
    const removeAt1 = remove(1);
    expect(removeAt1(array)).toEqual([1, 3]);
  });
});
