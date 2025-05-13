import { describe, it, expect } from 'vitest';
import { update } from './update';

describe('update', () => {
  it('应该替换指定位置的元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(update(2, 6, array)).toEqual([1, 2, 6, 4, 5]);
  });

  it('当索引为负数时应该从末尾开始计算', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(update(-2, 6, array)).toEqual([1, 2, 3, 6, 5]);
  });

  it('当索引为0时应该替换第一个元素', () => {
    const array = [1, 2, 3] as const;
    expect(update(0, 0, array)).toEqual([0, 2, 3]);
  });

  it('当索引为最后一个元素时应该替换最后一个元素', () => {
    const array = [1, 2, 3] as const;
    expect(update(2, 4, array)).toEqual([1, 2, 4]);
  });

  it('当索引超出数组长度时应该返回原数组', () => {
    const array = [1, 2, 3] as const;
    expect(update(5, 4, array)).toEqual([1, 2, 3]);
  });

  it('当索引为负数且超出数组长度时应该返回原数组', () => {
    const array = [1, 2, 3] as const;
    expect(update(-5, 0, array)).toEqual([1, 2, 3]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(update(0, 1, array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    update(1, 4, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3] as const;
    const updateAt1 = update(1);
    const updateAt1With4 = updateAt1(4);
    expect(updateAt1With4(array)).toEqual([1, 4, 3]);
  });
});
