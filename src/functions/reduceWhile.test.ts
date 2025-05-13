import { describe, it, expect } from 'vitest';
import { reduceWhile } from './reduceWhile';

describe('reduceWhile', () => {
  it('应该在满足条件时继续归约', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const predicate = (acc: number) => acc < 10;
    const reducer = (acc: number, val: number) => acc + val;
    expect(reduceWhile(predicate, reducer, 0, array)).toBe(6);
  });

  it('当数组为空且有初始值时应该返回初始值', () => {
    const array = [] as const;
    const predicate = (acc: number) => acc < 10;
    const reducer = (acc: number, val: number) => acc + val;
    expect(reduceWhile(predicate, reducer, 0, array)).toBe(0);
  });

  it('当第一个元素就不满足条件时应该返回初始值', () => {
    const array = [10, 2, 3, 4, 5] as const;
    const predicate = (acc: number) => acc < 10;
    const reducer = (acc: number, val: number) => acc + val;
    expect(reduceWhile(predicate, reducer, 0, array)).toBe(0);
  });

  it('应该支持对象数组', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }] as const;
    const predicate = (acc: number) => acc < 5;
    const reducer = (acc: number, val: { x: number }) => acc + val.x;
    expect(reduceWhile(predicate, reducer, 0, array)).toBe(3);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const predicate = (acc: number) => acc < 10;
    const reducer = (acc: number, val: number) => acc + val;
    const reduceWhileSum = reduceWhile(predicate, reducer, 0);
    expect(reduceWhileSum(array)).toBe(6);
  });
});
