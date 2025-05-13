import { describe, it, expect } from 'vitest';
import { reduceRight } from './reduceRight';

describe('reduceRight', () => {
  it('应该从右向左归约数组', () => {
    const array = [1, 2, 3, 4, 5];
    expect(reduceRight((acc: number, val) => acc - val, 0, array)).toBe(-15);
  });

  it('当数组为空且有初始值时应该返回初始值', () => {
    const array: number[] = [];
    expect(reduceRight((acc: number, val) => acc + val, 0, array)).toBe(0);
  });

  it('应该支持对象数组', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
    expect(reduceRight((acc: number, val) => acc + val.x, 0, array)).toBe(6);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5];
    const sumRight = reduceRight((acc: number, val: number) => acc + val, 0);
    expect(sumRight(array)).toBe(15);
  });
});
