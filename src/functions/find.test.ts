import { describe, it, expect } from 'vitest';
import { find } from './find';

describe('find', () => {
  it('应该返回满足条件的第一个元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(find(item => item > 3, array)).toBe(4);
  });

  it('当没有元素满足条件时应该返回 undefined', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(find(item => item > 10, array)).toBeUndefined();
  });

  it('当数组为空时应该返回 undefined', () => {
    const array = [] as const;
    expect(find(item => item > 0, array)).toBeUndefined();
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    expect(find(item => item.id > 2, array)).toEqual({ id: 3, name: 'Charlie' });
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const findGreaterThan3 = find(item => (item as number) > 3);
    expect(findGreaterThan3(array)).toBe(4);
  });
});
