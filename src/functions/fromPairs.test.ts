import { describe, it, expect } from 'vitest';
import { fromPairs } from './fromPairs';

describe('fromPairs', () => {
  it('应该将键值对数组转换为对象', () => {
    const pairs = [
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ];
    expect(fromPairs(pairs)).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('应该处理重复的键，保留最后一个值', () => {
    const pairs = [
      ['a', 1],
      ['b', 2],
      ['a', 3],
    ] as const;
    expect(fromPairs(pairs)).toEqual({ a: 3, b: 2 });
  });

  it('应该支持不同类型的值', () => {
    const pairs = [
      ['a', 1],
      ['b', '2'],
      ['c', true],
      ['d', [1, 2, 3]],
      ['e', { x: 1, y: 2 }],
    ] as const;
    expect(fromPairs(pairs)).toEqual({
      a: 1,
      b: '2',
      c: true,
      d: [1, 2, 3],
      e: { x: 1, y: 2 },
    });
  });

  it('应该处理空数组', () => {
    const pairs: [PropertyKey, unknown][] = [];
    expect(fromPairs(pairs)).toEqual({});
  });

  it('应该支持柯里化调用', () => {
    const pairs = [
      ['a', 1],
      ['b', 2],
    ] as const;
    const fromPairsWithArray = fromPairs(pairs);
    expect(fromPairsWithArray).toEqual({ a: 1, b: 2 });
  });
});
