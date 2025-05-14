import { describe, it, expect } from 'vitest';
import { groupBy } from './groupBy';

describe('groupBy', () => {
  it('应该根据键函数对数组元素进行分组', () => {
    const array = [
      { id: 1, type: 'a' },
      { id: 2, type: 'b' },
      { id: 3, type: 'a' },
      { id: 4, type: 'b' },
    ] as const;
    expect(groupBy(item => item.type, array)).toEqual({
      a: [
        { id: 1, type: 'a' },
        { id: 3, type: 'a' },
      ],
      b: [
        { id: 2, type: 'b' },
        { id: 4, type: 'b' },
      ],
    });
  });

  it('应该处理空数组', () => {
    type Item = { id: number; type: string };
    const array: readonly Item[] = [];
    expect(groupBy(item => item.type, array)).toEqual({});
  });

  it('应该支持数字键', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(groupBy(item => (item % 2 === 0 ? 'even' : 'odd'), array)).toEqual({
      odd: [1, 3, 5],
      even: [2, 4],
    });
  });

  it('应该支持柯里化调用', () => {
    const array = [
      { id: 1, type: 'a' },
      { id: 2, type: 'b' },
      { id: 3, type: 'a' },
    ] as const;
    const groupByType = groupBy(item => item.type);
    expect(groupByType(array)).toEqual({
      a: [
        { id: 1, type: 'a' },
        { id: 3, type: 'a' },
      ],
      b: [{ id: 2, type: 'b' }],
    });
  });
});
