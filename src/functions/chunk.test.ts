import { describe, it, expect } from 'vitest';
import { chunk } from './chunk';

describe('chunk', () => {
  it('应该将数组分割成指定大小的子数组', () => {
    const array = [1, 2, 3, 4, 5];
    expect(chunk(2, array)).toEqual([[1, 2], [3, 4], [5]]);
  });

  it('应该处理空数组', () => {
    const array: number[] = [];
    expect(chunk(2, array)).toEqual([]);
  });

  it('应该处理负数或零的size', () => {
    const array = [1, 2, 3, 4, 5];
    expect(chunk(0, array)).toEqual([]);
    expect(chunk(-1, array)).toEqual([]);
  });

  it('应该处理size大于数组长度的情况', () => {
    const array = [1, 2, 3];
    expect(chunk(5, array)).toEqual([[1, 2, 3]]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const chunkBy2 = chunk(2);
    expect(chunkBy2(array)).toEqual([[1, 2], [3, 4], [5]]);
  });
});
