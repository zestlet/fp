import { describe, it, expect } from 'vitest';
import { splice } from './splice';

describe('splice', () => {
  it('应该在指定位置插入和删除元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(splice(2, 2, [6, 7], array)).toEqual([1, 2, 6, 7, 5]);
  });

  it('当只插入不删除时应该正确插入元素', () => {
    const array = [1, 2, 3] as const;
    expect(splice(1, 0, [4, 5], array)).toEqual([1, 4, 5, 2, 3]);
  });

  it('当只删除不插入时应该正确删除元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(splice(1, 3, [], array)).toEqual([1, 5]);
  });

  it('当起始位置为负数时应该从末尾开始计算', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(splice(-3, 2, [6, 7], array)).toEqual([1, 2, 6, 7, 5]);
  });

  it('当起始位置超出数组长度时应该追加到末尾', () => {
    const array = [1, 2, 3] as const;
    expect(splice(5, 0, [4, 5], array)).toEqual([1, 2, 3, 4, 5]);
  });

  it('当删除数量超出可删除范围时应该只删除到数组末尾', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(splice(3, 5, [6], array)).toEqual([1, 2, 3, 6]);
  });

  it('当数组为空时应该只插入元素', () => {
    const array = [] as const;
    expect(splice(0, 0, [1, 2, 3], array)).toEqual([1, 2, 3]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    splice(1, 1, [4], array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const spliceAt2 = splice(2);
    const spliceAt2Delete2 = spliceAt2(2);
    const spliceAt2Delete2Insert67 = spliceAt2Delete2([6, 7]);
    expect(spliceAt2Delete2Insert67(array)).toEqual([1, 2, 6, 7, 5]);
  });
});
