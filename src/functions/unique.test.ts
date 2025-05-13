import { describe, it, expect } from 'vitest';
import { unique } from './unique';

describe('unique', () => {
  it('应该移除重复元素', () => {
    const array = [1, 2, 2, 3, 3, 4];
    expect(unique(array)).toEqual([1, 2, 3, 4]);
  });

  it('应该处理空数组', () => {
    const array: number[] = [];
    expect(unique(array)).toEqual([]);
  });

  it('应该处理对象数组', () => {
    const array = [{ id: 1 }, { id: 1 }, { id: 2 }];
    expect(unique(array)).toEqual([{ id: 1 }, { id: 1 }, { id: 2 }]);
  });
});
