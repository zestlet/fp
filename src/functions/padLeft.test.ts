import { describe, it, expect } from 'vitest';
import { padLeft } from './padLeft';

describe('padLeft', () => {
  it('应该在数组左侧填充元素直到达到指定长度', () => {
    const array = [1, 2, 3];
    expect(padLeft(5, 0, array)).toEqual([0, 0, 1, 2, 3]);
  });

  it('当目标长度小于等于数组长度时应该返回原数组', () => {
    const array = [1, 2, 3];
    expect(padLeft(3, 0, array)).toEqual([1, 2, 3]);
    expect(padLeft(2, 0, array)).toEqual([1, 2, 3]);
  });

  it('应该支持不同类型的填充值', () => {
    const array = [1, 2, 3];
    expect(padLeft(5, 'x', array as (number | string)[])).toEqual(['x', 'x', 1, 2, 3]);
    expect(padLeft(5, null, array as (number | null)[])).toEqual([null, null, 1, 2, 3]);
  });

  it('应该支持空数组', () => {
    const array: number[] = [];
    expect(padLeft(3, 0, array)).toEqual([0, 0, 0]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3];
    const padLeftWith0 = padLeft(5, 0);
    expect(padLeftWith0(array)).toEqual([0, 0, 1, 2, 3]);
  });
});
