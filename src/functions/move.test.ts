import { describe, it, expect } from 'vitest';
import { move } from './move';

describe('move', () => {
  it('应该将元素从一个位置移动到另一个位置', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(move(0, 4, array)).toEqual([2, 3, 4, 5, 1]);
  });

  it('应该支持负数索引', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(move(-1, 0, array)).toEqual([5, 1, 2, 3, 4]);
  });

  it('当索引超出范围时应该返回原数组的副本', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(move(0, 10, array)).toEqual([...array]);
    expect(move(-10, 0, array)).toEqual([...array]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(move(0, 1, array)).toEqual([]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const moveFirstToLast = move(0, 4);
    expect(moveFirstToLast(array)).toEqual([2, 3, 4, 5, 1]);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    expect(move(0, 2, array)).toEqual([
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
      { id: 1, name: 'Alice' },
    ]);
  });

  it('当移动位置相同时应该返回原数组的副本', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(move(0, 0, array)).toEqual([...array]);
  });
});
