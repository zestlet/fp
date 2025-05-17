import { describe, it, expect } from 'vitest';
import { unzipWith } from './unzipWith';

describe('unzipWith', () => {
  it('应该使用函数解压缩列表', () => {
    const array = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(unzipWith((tuple: number[]) => tuple.reduce((a, b) => a + b, 0), array)).toEqual([9, 12]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array: number[][] = [];
    expect(unzipWith((tuple: number[]) => tuple.reduce((a, b) => a + b, 0), array)).toEqual([]);
  });

  it('应该支持不同长度的元组', () => {
    const array = [
      [1, 2, 3],
      [4, 5],
      [6, 7, 8, 9],
    ];
    expect(unzipWith((tuple: (number | undefined)[]) => tuple.reduce<number>((sum, b) => sum + (b ?? 0), 0), array)).toEqual([
      11, 14, 11, 9,
    ]);
  });

  it('应该支持对象数组', () => {
    interface Item {
      id: number;
      value: number;
    }
    const array: Item[][] = [
      [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
      ],
      [
        { id: 3, value: 30 },
        { id: 4, value: 40 },
      ],
      [
        { id: 5, value: 50 },
        { id: 6, value: 60 },
      ],
    ];
    expect(unzipWith((tuple: Item[]) => tuple.reduce((sum, item) => sum + item.value, 0), array)).toEqual([90, 120]);
  });

  it('应该支持柯里化调用', () => {
    const array = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const sumTuples = unzipWith((tuple: number[]) => tuple.reduce((a, b) => a + b, 0));
    expect(sumTuples(array)).toEqual([9, 12]);
  });

  it('应该正确处理undefined值', () => {
    const array = [[1, 2], [3], [5, 6]];
    expect(unzipWith((tuple: (number | undefined)[]) => tuple.reduce<number>((sum, b) => sum + (b ?? 0), 0), array)).toEqual([9, 8]);
  });
});
