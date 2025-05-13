import { describe, it, expect } from 'vitest';
import { none } from './none';

describe('none', () => {
  it('当没有元素满足条件时应该返回 true', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(none(item => item > 5, array)).toBe(true);
  });

  it('当有元素满足条件时应该返回 false', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(none(item => item > 3, array)).toBe(false);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    expect(none(item => item.id < 0, array)).toBe(true);
    expect(none(item => item.name === 'Bob', array)).toBe(false);
  });

  it('当数组为空时应该返回 true', () => {
    const array = [] as const;
    expect(none(item => item > 0, array)).toBe(true);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const noneGreaterThan5 = none<number>(item => item > 5);
    expect(noneGreaterThan5(array)).toBe(true);
  });
});
