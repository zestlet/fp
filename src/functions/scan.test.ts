import { describe, it, expect } from 'vitest';
import { scan } from './scan';

describe('scan', () => {
  it('应该返回所有中间累加值的列表', () => {
    const array = [1, 2, 3, 4];
    expect(scan((acc: number, curr) => acc + curr, 0, array)).toEqual([0, 1, 3, 6, 10]);
  });

  it('应该处理空数组', () => {
    const array: number[] = [];
    expect(scan((acc: number, curr) => acc + curr, 0, array)).toEqual([0]);
  });

  it('应该支持对象累加', () => {
    type Item = { id: number };
    const array: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }];
    expect(scan((acc: { id: number }, curr) => ({ id: acc.id + curr.id }), { id: 0 }, array)).toEqual([
      { id: 0 },
      { id: 1 },
      { id: 3 },
      { id: 6 },
    ]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3];
    const scanWithAdd = scan((acc: number, curr: number) => acc + curr, 0);
    expect(scanWithAdd(array)).toEqual([0, 1, 3, 6]);
  });
});
