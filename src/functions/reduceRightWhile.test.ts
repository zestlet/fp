import { describe, it, expect, expectTypeOf } from 'vitest';
import { reduceRightWhile } from './reduceRightWhile';

describe('reduceRightWhile', () => {
  it('应该从右向左归约直到不满足条件', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const predicate = (acc: number) => acc < 10;
    const reducer = (acc: number, val: number) => acc + val;
    expect(reduceRightWhile(predicate, reducer, 0, array)).toBe(9);
  });

  it('当数组为空且有初始值时应该返回初始值', () => {
    const array = [] as const;
    const predicate = (acc: number) => acc < 10;
    const reducer = (acc: number, val: number) => acc + val;
    expect(reduceRightWhile(predicate, reducer, 0, array)).toBe(0);
  });

  it('当最后一个元素就不满足条件时应该返回初始值', () => {
    const array = [1, 2, 3, 4, 10] as const;
    const predicate = (acc: number) => acc < 10;
    const reducer = (acc: number, val: number) => acc + val;
    expect(reduceRightWhile(predicate, reducer, 0, array)).toBe(0);
  });

  it('应该支持对象数组', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }] as const;
    const predicate = (acc: number) => acc < 5;
    const reducer = (acc: number, val: { x: number }) => acc + val.x;
    expect(reduceRightWhile(predicate, reducer, 0, array)).toBe(3);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const predicate = (acc: number) => acc < 10;
    const reducer = (acc: number, val: number) => acc + val;
    // 4个参数的所有组合
    const result1 = reduceRightWhile(predicate, reducer, 0, array);
    const result2 = reduceRightWhile(predicate, reducer, 0)(array);
    const result3 = reduceRightWhile(predicate, reducer)(0, array);
    const result4 = reduceRightWhile(predicate, reducer)(0)(array);
    const result5 = reduceRightWhile(predicate)(reducer, 0, array);
    const result6 = reduceRightWhile(predicate)(reducer, 0)(array);
    const result7 = reduceRightWhile(predicate)(reducer)(0, array);
    const result8 = reduceRightWhile(predicate)(reducer)(0)(array);
    expect(result1).toBe(9);
    expect(result2).toBe(9);
    expect(result3).toBe(9);
    expect(result4).toBe(9);
    expect(result5).toBe(9);
    expect(result6).toBe(9);
    expect(result7).toBe(9);
    expect(result8).toBe(9);

    expectTypeOf(result1).toBeNumber();
    expectTypeOf(result2).toBeNumber();
    expectTypeOf(result3).toBeNumber();
    expectTypeOf(result4).toBeNumber();
    expectTypeOf(result5).toBeNumber();
    expectTypeOf(result6).toBeNumber();
    expectTypeOf(result7).toBeNumber();
    expectTypeOf(result8).toBeNumber();
  });
});
