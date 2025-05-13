import { describe, it, expect } from 'vitest';
import { anyPass } from './anyPass';

describe('anyPass', () => {
  it('当值满足任意一个条件时应该返回 true', () => {
    const predicates = [(item: number) => item > 3, (item: number) => item % 2 === 0, (item: number) => item < 3] as const;
    const value = 4;
    expect(anyPass(predicates, value)).toBe(true);
  });

  it('当值不满足任何条件时应该返回 false', () => {
    const predicates = [(item: number) => item > 3, (item: number) => item % 2 === 0, (item: number) => item < 3] as const;
    const value = 3;
    expect(anyPass(predicates, value)).toBe(false);
  });

  it('应该支持对象值', () => {
    const predicates = [
      (item: { id: number; name: string; age: number }) => item.age > 25,
      (item: { id: number; name: string; age: number }) => item.name.length > 3,
      (item: { id: number; name: string; age: number }) => item.id < 2,
    ] as const;
    const value = { id: 2, name: 'Bob', age: 30 };
    expect(anyPass(predicates, value)).toBe(true);
  });

  it('当条件数组为空时应该返回 false', () => {
    const predicates = [] as const;
    const value = 1;
    expect(anyPass(predicates, value)).toBe(false);
  });

  it('应该支持柯里化调用', () => {
    const predicates = [(item: number) => item > 3, (item: number) => item % 2 === 0] as const;
    const value = 4;
    const anyPassPredicates = anyPass(predicates);
    expect(anyPassPredicates(value)).toBe(true);
  });
});
