import { describe, it, expect } from 'vitest';
import { unfold } from './unfold';

describe('unfold', () => {
  it('应该根据初始值和迭代函数生成列表', () => {
    const fn = (n: number): [number, number] | false => (n < 5 ? [n, n + 1] : false);
    expect(unfold(fn, 1)).toEqual([1, 2, 3, 4]);
  });

  it('应该处理迭代函数立即返回 false 的情况', () => {
    const fn = (n: number): [number, number] | false => false;
    expect(unfold(fn, 1)).toEqual([]);
  });

  it('应该支持不同类型的值', () => {
    const fn = (n: number): [{ value: number }, number] | false => (n < 3 ? [{ value: n }, n + 1] : false);
    expect(unfold(fn, 1)).toEqual([{ value: 1 }, { value: 2 }]);
  });

  it('应该支持柯里化调用', () => {
    const fn = (n: number): [number, number] | false => (n < 3 ? [n, n + 1] : false);
    const unfoldWithFn = unfold(fn);
    expect(unfoldWithFn(1)).toEqual([1, 2]);
  });

  it('应该处理复杂的迭代逻辑', () => {
    type State = { value: number; acc: number[] };
    const fn = (state: State): [number[], State] | false => {
      if (state.value > 5) return false;
      return [state.acc, { value: state.value + 1, acc: [...state.acc, state.value] }];
    };
    expect(unfold(fn, { value: 1, acc: [] })).toEqual([[], [1], [1, 2], [1, 2, 3], [1, 2, 3, 4]]);
  });
});
