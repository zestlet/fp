import { describe, it, expect } from 'vitest';
import { pluck } from './pluck';

describe('pluck', () => {
  it('应该从对象数组中提取指定键的值', () => {
    const array = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
      { id: 3, name: 'c' },
    ];
    expect(pluck('id', array)).toEqual([1, 2, 3]);
    expect(pluck('name', array)).toEqual(['a', 'b', 'c']);
  });

  it('应该处理空数组', () => {
    const array: { id: number; name: string }[] = [];
    expect(pluck('id', array)).toEqual([]);
  });

  it('应该处理不同类型的值', () => {
    const array = [
      { id: 1, active: true, score: 95.5 },
      { id: 2, active: false, score: 88.0 },
    ];
    expect(pluck('active', array)).toEqual([true, false]);
    expect(pluck('score', array)).toEqual([95.5, 88.0]);
  });

  it('应该支持柯里化调用', () => {
    const array = [
      { id: 1, name: 'a' },
      { id: 2, name: 'b' },
    ] as const;
    const pluckId = pluck('id');
    expect(pluckId(array)).toEqual([1, 2]);
  });
});
