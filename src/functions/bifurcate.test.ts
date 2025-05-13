import { describe, it, expect } from 'vitest';
import { bifurcate } from './bifurcate';

describe('bifurcate', () => {
  it('应该根据布尔列表将数组分割成两个部分', () => {
    const array = [1, 2, 3, 4, 5];
    const filter = [true, false, true, false, true];
    expect(bifurcate(filter, array)).toEqual([
      [1, 3, 5],
      [2, 4],
    ]);
  });

  it('应该处理布尔列表长度小于数组长度的情况', () => {
    const array = [1, 2, 3, 4, 5];
    const filter = [true, false];
    expect(bifurcate(filter, array)).toEqual([[1], [2]]);
  });

  it('应该处理布尔列表长度大于数组长度的情况', () => {
    const array = [1, 2];
    const filter = [true, false, true, false, true];
    expect(bifurcate(filter, array)).toEqual([[1], [2]]);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const filter = [true, false, true];
    expect(bifurcate(filter, array)).toEqual([
      [
        { id: 1, name: 'Alice' },
        { id: 3, name: 'Charlie' },
      ],
      [{ id: 2, name: 'Bob' }],
    ]);
  });

  it('应该处理空数组', () => {
    const array: number[] = [];
    const filter = [true, false, true];
    expect(bifurcate(filter, array)).toEqual([[], []]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const filter = [true, false, true, false, true] as const;
    const bifurcateWithFilter = bifurcate(filter);
    const result = bifurcateWithFilter(array);

    expect(result).toEqual([
      [1, 3, 5],
      [2, 4],
    ]);
  });
});
