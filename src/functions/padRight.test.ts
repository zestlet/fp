import { describe, it, expect } from 'vitest';
import { padRight } from './padRight';

describe('padRight', () => {
  it('应该在数组右侧填充元素直到达到指定长度', () => {
    const array = [1, 2, 3];
    expect(padRight(5, 0, array)).toEqual([1, 2, 3, 0, 0]);
  });

  it('当目标长度小于等于数组长度时应该返回原数组', () => {
    const array = [1, 2, 3];
    expect(padRight(3, 0, array)).toEqual([1, 2, 3]);
    expect(padRight(2, 0, array)).toEqual([1, 2, 3]);
  });

  it('应该支持不同类型的填充值', () => {
    const array = [1, 2, 3];
    expect(padRight(5, 'x', array as (number | string)[])).toEqual([1, 2, 3, 'x', 'x']);
    expect(padRight(5, null, array as (number | null)[])).toEqual([1, 2, 3, null, null]);
  });

  it('应该支持空数组', () => {
    const array: number[] = [];
    expect(padRight(3, 0, array)).toEqual([0, 0, 0]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3];
    const padRightWith0 = padRight(5, 0);
    expect(padRightWith0(array)).toEqual([1, 2, 3, 0, 0]);
  });
});
