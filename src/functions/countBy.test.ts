import { describe, it, expect } from 'vitest';
import { countBy } from './countBy';

describe('countBy', () => {
  it('应该根据键函数对数组元素进行计数', () => {
    const array = [1, 2, 3, 4, 5];
    expect(countBy(item => (item % 2 === 0 ? 'even' : 'odd'), array)).toEqual({
      odd: 3,
      even: 2,
    });
  });

  it('应该处理空数组', () => {
    const array: number[] = [];
    expect(countBy(item => (item % 2 === 0 ? 'even' : 'odd'), array)).toEqual({});
  });

  it('应该处理对象数组', () => {
    type Item = { id: number; type: string };
    const array: Item[] = [
      { id: 1, type: 'a' },
      { id: 2, type: 'b' },
      { id: 3, type: 'a' },
      { id: 4, type: 'b' },
    ];
    expect(countBy(item => item.type, array)).toEqual({
      a: 2,
      b: 2,
    });
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const countByEvenOdd = countBy(item => ((item as number) % 2 === 0 ? 'even' : 'odd'));
    expect(countByEvenOdd(array)).toEqual({
      odd: 3,
      even: 2,
    });
  });
});
