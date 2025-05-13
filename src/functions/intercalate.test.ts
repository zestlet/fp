import { describe, it, expect } from 'vitest';
import { intercalate } from './intercalate';

describe('intercalate', () => {
  it('应该在数组元素之间插入分隔符并展平一层', () => {
    const arrays = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    expect(intercalate(0, arrays)).toEqual([1, 2, 0, 3, 4, 0, 5, 6]);
  });

  it('当数组为空时应该返回空数组', () => {
    const arrays: number[][] = [];
    expect(intercalate(0, arrays)).toEqual([]);
  });

  it('当数组只有一个元素时应该返回展平后的元素', () => {
    const arrays = [[1, 2, 3]];
    expect(intercalate(0, arrays)).toEqual([1, 2, 3]);
  });

  it('应该支持不同类型的数组', () => {
    const arrays = [
      [1, 2],
      ['a', 'b'],
      [true, false],
    ];
    expect(intercalate('|', arrays)).toEqual([1, 2, '|', 'a', 'b', '|', true, false]);
  });

  it('应该支持对象数组', () => {
    const arrays = [
      [{ id: 1 }, { id: 2 }],
      [{ name: 'Alice' }, { name: 'Bob' }],
    ];
    const separator = { type: 'separator' };
    expect(intercalate(separator, arrays)).toEqual([{ id: 1 }, { id: 2 }, { type: 'separator' }, { name: 'Alice' }, { name: 'Bob' }]);
  });

  it('应该支持柯里化调用', () => {
    const arrays = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];
    const intercalateWith0 = intercalate(0);
    expect(intercalateWith0(arrays)).toEqual([1, 2, 0, 3, 4, 0, 5, 6]);
  });

  it('应该正确处理空子数组', () => {
    const arrays = [[1, 2], [], [3, 4]];
    expect(intercalate(0, arrays)).toEqual([1, 2, 0, 0, 3, 4]);
  });

  it('应该正确处理嵌套数组', () => {
    const arrays = [
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
    ];
    expect(intercalate([0, 0], arrays)).toEqual([[1, 2], [3, 4], 0, 0, [5, 6], [7, 8]]);
  });
});
