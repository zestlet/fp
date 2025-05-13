import { describe, it, expect } from 'vitest';
import { ap } from './ap';

describe('ap', () => {
  it('应该将函数数组应用到值数组的每个元素上', () => {
    const fns = [(x: number) => x + 1, (x: number) => x * 2];
    const values = [1, 2, 3];
    expect(ap(fns, values)).toEqual([2, 3, 4, 2, 4, 6]);
  });

  it('应该支持不同类型的返回值', () => {
    const fns = [(x: number) => x.toString(), (x: number) => x > 0, (x: number) => [x, x * 2]];
    const values = [1, 2];
    expect(ap(fns, values)).toEqual([
      '1',
      '2', // toString
      true,
      true, // x > 0
      [1, 2],
      [2, 4], // [x, x * 2]
    ]);
  });

  it('应该支持空函数数组', () => {
    const fns: Array<(x: number) => number> = [];
    const values = [1, 2, 3];
    expect(ap(fns, values)).toEqual([]);
  });

  it('应该支持空值数组', () => {
    const fns = [(x: number) => x + 1, (x: number) => x * 2];
    const values: number[] = [];
    expect(ap(fns, values)).toEqual([]);
  });

  it('应该支持柯里化调用', () => {
    const fns = [(x: number) => x + 1, (x: number, _b: string) => x * 2];
    const values = [1, 2, 3];
    const apWithFns = ap(fns);
    expect(apWithFns(values)).toEqual([2, 3, 4, 2, 4, 6]);
  });
});
