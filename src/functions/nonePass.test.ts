import { describe, it, expect } from 'vitest';
import { nonePass } from './nonePass';

describe('nonePass', () => {
  it('当值不满足任何条件时应该返回 true', () => {
    const predicates = [(item: number) => item > 3, (item: number) => item % 2 === 0, (item: number) => item < 3] as const;
    const value = 3;
    expect(nonePass(predicates, value)).toBe(true);
  });

  it('当值满足任意一个条件时应该返回 false', () => {
    const predicates = [(item: number) => item > 3, (item: number) => item % 2 === 0, (item: number) => item < 3] as const;
    const value = 4;
    expect(nonePass(predicates, value)).toBe(false);
  });

  it('应该支持对象值', () => {
    const predicates = [
      (item: { id: number; name: string; age: number }) => item.age > 35,
      (item: { id: number; name: string; age: number }) => item.name.length > 5,
      (item: { id: number; name: string; age: number }) => item.id < 1,
    ] as const;
    const value = { id: 2, name: 'Bob', age: 30 };
    expect(nonePass(predicates, value)).toBe(true);
  });

  it('当条件数组为空时应该返回 true', () => {
    const predicates = [] as const;
    const value = 1;
    expect(nonePass(predicates, value)).toBe(true);
  });

  it('应该支持柯里化调用', () => {
    const predicates = [(item: number) => item > 3, (item: number) => item % 2 === 0, (item: number) => item < 3] as const;
    const value = 3;
    const nonePassPredicates = nonePass(predicates);
    expect(nonePassPredicates(value)).toBe(true);
  });
});
