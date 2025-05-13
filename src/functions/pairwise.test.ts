import { describe, it, expect } from 'vitest';
import { pairwise } from './pairwise';

describe('pairwise', () => {
  it('应该将数组分成相邻的对', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(pairwise(array)).toEqual([
      [1, 2],
      [3, 4],
    ]);
  });

  it('当数组长度为奇数时应该忽略最后一个元素', () => {
    const array = [1, 2, 3] as const;
    expect(pairwise(array)).toEqual([[1, 2]]);
  });

  it('当数组长度小于2时应该返回空数组', () => {
    const array = [1] as const;
    expect(pairwise(array)).toEqual([]);
    expect(pairwise([])).toEqual([]);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 4, name: 'David' },
    ] as const;
    expect(pairwise(array)).toEqual([
      [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ],
      [
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
      ],
    ]);
  });
});
