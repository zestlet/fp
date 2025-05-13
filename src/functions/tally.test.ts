import { describe, it, expect } from 'vitest';
import { tally } from './tally';

describe('tally', () => {
  it('应该统计数组中每个元素出现的次数', () => {
    const array = [1, 2, 2, 3, 3, 3] as const;
    const result = tally(array);
    expect(result.get(1)).toBe(1);
    expect(result.get(2)).toBe(2);
    expect(result.get(3)).toBe(3);
  });

  it('当数组为空时应该返回空 Map', () => {
    const array = [] as const;
    const result = tally(array);
    expect(result.size).toBe(0);
  });

  it('应该支持对象数组', () => {
    const obj1 = { id: 1, name: 'Alice' };
    const obj2 = { id: 2, name: 'Bob' };
    const array = [obj1, obj1, obj2] as const;
    const result = tally(array);
    expect(result.get(array[0])).toBe(2);
    expect(result.get(array[2])).toBe(1);
  });

  it('应该正确处理不同类型的元素', () => {
    const array = [1, '1', true, 'true', 1, true] as const;
    const result = tally(array);
    expect(result.get(1)).toBe(2);
    expect(result.get('1')).toBe(1);
    expect(result.get(true)).toBe(2);
    expect(result.get('true')).toBe(1);
  });
});
