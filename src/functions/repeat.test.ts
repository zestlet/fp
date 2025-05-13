import { describe, it, expect } from 'vitest';
import { repeat } from './repeat';

describe('repeat', () => {
  it('应该重复指定次数', () => {
    expect(repeat('a', 3)).toEqual(['a', 'a', 'a']);
  });

  it('当 count 为 0 时应该返回空数组', () => {
    expect(repeat('a', 0)).toEqual([]);
  });

  it('当 count 为负数时应该返回空数组', () => {
    expect(repeat('a', -1)).toEqual([]);
  });

  it('应该支持对象类型', () => {
    const obj = { id: 1 };
    expect(repeat(obj, 2)).toEqual([obj, obj]);
  });

  it('应该支持柯里化调用', () => {
    const repeatA = repeat('a');
    expect(repeatA(3)).toEqual(['a', 'a', 'a']);
  });
});
