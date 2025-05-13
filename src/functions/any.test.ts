import { describe, it, expect } from 'vitest';
import { any } from './any';

describe('any', () => {
  it('当至少有一个元素满足条件时应该返回 true', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(any(item => item > 3, array)).toBe(true);
  });

  it('当没有元素满足条件时应该返回 false', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(any(item => item > 5, array)).toBe(false);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    expect(any(item => item.name === 'Bob', array)).toBe(true);
    expect(any(item => item.name === ('David' as (typeof array)[number]['name']), array)).toBe(false);
  });

  it('当数组为空时应该返回 false', () => {
    const array = [] as const;
    expect(any(item => item > 0, array)).toBe(false);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const anyGreaterThan3 = any(item => (item as number) > 3);
    expect(anyGreaterThan3(array)).toBe(true);
  });
});
