import { describe, it, expect } from 'vitest';
import { allPass } from './allPass';

describe('allPass', () => {
  it('当值满足所有条件时应该返回 true', () => {
    const predicates = [(item: number) => item > 0, (item: number) => item % 2 === 0, (item: number) => item < 5] as const;
    const value = 4;
    expect(allPass(predicates, value)).toBe(true);
  });

  it('当值不满足所有条件时应该返回 false', () => {
    const predicates = [(item: number) => item > 0, (item: number) => item % 2 === 0, (item: number) => item < 3] as const;
    const value = 4;
    expect(allPass(predicates, value)).toBe(false);
  });

  it('应该支持对象值', () => {
    const predicates = [
      (item: { id: number; name: string; age: number }) => item.id > 0,
      (item: { id: number; name: string; age: number }) => item.name.length > 2,
      (item: { id: number; name: string; age: number }) => item.age > 18,
    ] as const;
    const value = { id: 2, name: 'Bob', age: 30 };
    expect(allPass(predicates, value)).toBe(true);
  });

  it('当条件数组为空时应该返回 true', () => {
    const predicates = [] as const;
    const value = 1;
    expect(allPass(predicates, value)).toBe(true);
  });

  it('应该支持柯里化调用', () => {
    const value = 4;
    const allPassPredicates = allPass([item => (item as number) > 0, item => (item as number) % 2 === 0]);
    expect(allPassPredicates(value)).toBe(true);
  });
});
