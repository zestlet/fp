import { describe, it, expect } from 'vitest';
import { weave } from './weave';

describe('weave', () => {
  it('应该正确交织多个数组', () => {
    const arrays = [
      [1, 2, 3],
      [4, 5],
      [6, 7, 8],
    ];
    expect(weave(arrays)).toEqual([1, 4, 6, 2, 5, 7, 3, 8]);
  });

  it('应该支持对象数组', () => {
    type Item = { id?: number; name?: string; age?: number };
    const arrays: Item[][] = [
      [{ id: 1 }, { id: 2 }],
      [{ name: 'Alice' }, { name: 'Bob' }],
      [{ age: 20 }, { age: 30 }],
    ];
    expect(weave(arrays)).toEqual([{ id: 1 }, { name: 'Alice' }, { age: 20 }, { id: 2 }, { name: 'Bob' }, { age: 30 }]);
  });

  it('当输入为空数组时应该返回空数组', () => {
    expect(weave([])).toEqual([]);
  });

  it('当输入数组都为空时应该返回空数组', () => {
    expect(weave([[], [], []])).toEqual([]);
  });

  it('应该正确处理不同长度的数组', () => {
    const arrays = [
      [1, 2, 3, 4],
      [5, 6],
      [7, 8, 9],
    ];
    expect(weave(arrays)).toEqual([1, 5, 7, 2, 6, 8, 3, 9, 4]);
  });

  it('应该正确处理undefined值', () => {
    const arrays = [
      [1, undefined, 3],
      [4, 5],
      [6, 7, 8],
    ];
    expect(weave(arrays)).toEqual([1, 4, 6, undefined, 5, 7, 3, 8]);
  });
});
