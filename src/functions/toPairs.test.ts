import { describe, it, expect } from 'vitest';
import { toPairs } from './toPairs';

describe('toPairs', () => {
  it('应该将对象转换为键值对数组', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(toPairs(obj)).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
  });

  it('应该处理不同类型的值', () => {
    const obj = {
      a: 1,
      b: '2',
      c: true,
      d: [1, 2, 3],
      e: { x: 1, y: 2 },
    };
    expect(toPairs(obj)).toEqual([
      ['a', 1],
      ['b', '2'],
      ['c', true],
      ['d', [1, 2, 3]],
      ['e', { x: 1, y: 2 }],
    ]);
  });

  it('应该处理空对象', () => {
    const obj = {};
    expect(toPairs(obj)).toEqual([]);
  });

  it('应该保持键的顺序', () => {
    const obj = { b: 2, a: 1, c: 3 };
    expect(toPairs(obj)).toEqual([
      ['b', 2],
      ['a', 1],
      ['c', 3],
    ]);
  });
});
