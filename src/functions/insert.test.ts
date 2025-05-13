import { describe, it, expect } from 'vitest';
import { insert } from './insert';

describe('insert', () => {
  it('应该在指定位置插入元素', () => {
    const array = [1, 2, 3, 4] as const;
    expect(insert(2, 5, array)).toEqual([1, 2, 5, 3, 4]);
  });

  it('当索引为负数时应该从末尾开始计算', () => {
    const array = [1, 2, 3, 4] as const;
    expect(insert(-2, 5, array)).toEqual([1, 2, 5, 3, 4]);
  });

  it('当索引为0时应该在数组开头插入', () => {
    const array = [1, 2, 3] as const;
    expect(insert(0, 0, array)).toEqual([0, 1, 2, 3]);
  });

  it('当索引等于数组长度时应该在数组末尾插入', () => {
    const array = [1, 2, 3] as const;
    expect(insert(3, 4, array)).toEqual([1, 2, 3, 4]);
  });

  it('当索引超出数组长度时应该在数组末尾插入', () => {
    const array = [1, 2, 3] as const;
    expect(insert(5, 4, array)).toEqual([1, 2, 3, 4]);
  });

  it('当索引为负数且超出数组长度时应该在数组开头插入', () => {
    const array = [1, 2, 3] as const;
    expect(insert(-5, 0, array)).toEqual([0, 1, 2, 3]);
  });

  it('当数组为空时应该插入元素', () => {
    const array = [] as const;
    expect(insert(0, 1, array)).toEqual([1]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    insert(1, 4, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3] as const;
    const insertAt1 = insert(1);
    const insertAt1With4 = insertAt1(4);
    expect(insertAt1With4(array)).toEqual([1, 4, 2, 3]);
  });
});
