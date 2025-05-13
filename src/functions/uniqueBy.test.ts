import { describe, it, expect } from 'vitest';
import { uniqueBy } from './uniqueBy';

describe('uniqueBy', () => {
  it('应该基于转换函数移除重复元素', () => {
    type Item = { id: number };
    const array: Item[] = [{ id: 1 }, { id: 1 }, { id: 2 }];
    expect(uniqueBy((item: Item) => item.id, array)).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('应该处理空数组', () => {
    type Item = { id: number };
    const array: Item[] = [];
    expect(uniqueBy((item: Item) => item.id, array)).toEqual([]);
  });

  it('应该处理复杂对象', () => {
    type Item = { id: number; name: string };
    const array: Item[] = [
      { id: 1, name: 'a' },
      { id: 1, name: 'b' },
      { id: 2, name: 'c' },
    ];
    expect(uniqueBy((item: Item) => item.id, array)).toEqual([
      { id: 1, name: 'a' },
      { id: 2, name: 'c' },
    ]);
  });

  it('应该支持柯里化调用', () => {
    type Item = { id: number };
    const array: Item[] = [{ id: 1 }, { id: 1 }, { id: 2 }];
    const uniqueById = uniqueBy((item: Item) => item.id);
    expect(uniqueById(array)).toEqual([{ id: 1 }, { id: 2 }]);
  });
});
