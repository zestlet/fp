import { describe, it, expect } from 'vitest';
import { transpose } from './transpose';

describe('transpose', () => {
  it('应该对二维数组进行转置操作', () => {
    const array = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    expect(transpose(array)).toEqual([
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
    ]);
  });

  it('应该处理空数组', () => {
    const array: number[][] = [];
    expect(transpose(array)).toEqual([]);
  });

  it('应该处理不规则数组（以最短内部列表长度为准）', () => {
    const array = [
      [1, 2, 3],
      [4, 5],
      [7, 8, 9, 10],
    ];
    expect(transpose(array)).toEqual([
      [1, 4, 7],
      [2, 5, 8],
    ]);
  });

  it('应该处理对象数组', () => {
    type Item = { id: number };
    const array: Item[][] = [
      [{ id: 1 }, { id: 2 }],
      [{ id: 3 }, { id: 4 }],
    ];
    expect(transpose(array)).toEqual([
      [{ id: 1 }, { id: 3 }],
      [{ id: 2 }, { id: 4 }],
    ]);
  });
});
