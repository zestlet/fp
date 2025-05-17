import { describe, it, expect } from 'vitest';
import { zipAll, ZipAllShortest } from './zipAll';

describe('zipall', () => {
  it('应该使用默认值填充到最长长度', () => {
    const arrays = [
      [1, 2, 3],
      [4, 5],
      [6, 7, 8],
    ];
    expect(zipAll(0, arrays)).toEqual([
      [1, 4, 6],
      [2, 5, 7],
      [3, 0, 8],
    ]);
  });

  it('当使用ZipAllShortest时应该按最短长度压缩', () => {
    const arrays = [
      [1, 2, 3],
      [4, 5],
      [6, 7, 8],
    ];
    expect(zipAll(ZipAllShortest, arrays)).toEqual([
      [1, 4, 6],
      [2, 5, 7],
    ]);
  });

  it('当数组为空时应该返回空数组', () => {
    const arrays: number[][] = [];
    expect(zipAll(0, arrays)).toEqual([]);
  });

  it('当所有数组长度相同时应该返回相同的结果', () => {
    const arrays = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(zipAll(0, arrays)).toEqual([
      [1, 3, 5],
      [2, 4, 6],
    ]);
    expect(zipAll(ZipAllShortest, arrays)).toEqual([
      [1, 3, 5],
      [2, 4, 6],
    ]);
  });

  it('应该支持对象数组', () => {
    interface Item {
      id: number;
      value: number;
    }
    const arrays: Item[][] = [
      [
        { id: 1, value: 10 },
        { id: 2, value: 20 },
      ],
      [{ id: 3, value: 30 }],
      [
        { id: 4, value: 40 },
        { id: 5, value: 50 },
        { id: 6, value: 60 },
      ],
    ];
    const defaultItem = { id: 0, value: 0 };
    expect(zipAll(defaultItem, arrays)).toEqual([
      [
        { id: 1, value: 10 },
        { id: 3, value: 30 },
        { id: 4, value: 40 },
      ],
      [
        { id: 2, value: 20 },
        { id: 0, value: 0 },
        { id: 5, value: 50 },
      ],
      [
        { id: 0, value: 0 },
        { id: 0, value: 0 },
        { id: 6, value: 60 },
      ],
    ]);
  });

  it('应该支持柯里化调用', () => {
    const arrays = [
      [1, 2, 3],
      [4, 5],
      [6, 7, 8],
    ];
    const zipWithZero = zipAll(0);
    expect(zipWithZero(arrays)).toEqual([
      [1, 4, 6],
      [2, 5, 7],
      [3, 0, 8],
    ]);
  });

  it('应该正确处理undefined值', () => {
    const arrays = [
      [1, undefined, 3],
      [4, 5],
      [6, 7, 8],
    ];
    expect(zipAll(0, arrays)).toEqual([
      [1, 4, 6],
      [undefined, 5, 7],
      [3, 0, 8],
    ]);
    expect(zipAll(ZipAllShortest, arrays)).toEqual([
      [1, 4, 6],
      [undefined, 5, 7],
    ]);
  });
});
