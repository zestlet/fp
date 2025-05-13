import { describe, it, expect } from 'vitest';
import { all } from './all';

describe('all', () => {
  it('当所有元素都满足条件时应该返回 true', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(all(item => item > 0, array)).toBe(true);
  });

  it('当有元素不满足条件时应该返回 false', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(all(item => item > 3, array)).toBe(false);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    expect(all(item => item.id > 0, array)).toBe(true);
    expect(all(item => item.name.length > 3, array)).toBe(false);
  });

  it('当数组为空时应该返回 true', () => {
    const array = [] as const;
    expect(all(item => item > 0, array)).toBe(true);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const allGreaterThan0 = all(item => (item as number) > 0);
    expect(allGreaterThan0(array)).toBe(true);
  });
});
