import { describe, it, expect } from 'vitest';
import { times } from './times';

describe('times', () => {
  it('应该调用回调函数指定次数', () => {
    expect(times(index => index * 2, 3)).toEqual([0, 2, 4]);
  });

  it('当 count 为 0 时应该返回空数组', () => {
    expect(times(() => 1, 0)).toEqual([]);
  });

  it('当 count 为负数时应该返回空数组', () => {
    expect(times(() => 1, -1)).toEqual([]);
  });

  it('应该支持对象类型', () => {
    expect(times(index => ({ id: index }), 2)).toEqual([{ id: 0 }, { id: 1 }]);
  });

  it('应该支持柯里化调用', () => {
    const doubleIndex = times((index: number) => index * 2);
    expect(doubleIndex(3)).toEqual([0, 2, 4]);
  });
});
