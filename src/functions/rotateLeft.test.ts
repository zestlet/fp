import { describe, it, expect } from 'vitest';
import { rotateLeft } from './rotateLeft';

describe('rotateLeft', () => {
  it('应该正确向左旋转数组', () => {
    const array = [1, 2, 3, 4, 5];
    expect(rotateLeft(2, array)).toEqual([3, 4, 5, 1, 2]);
  });

  it('当旋转次数为负数时应该向右旋转', () => {
    const array = [1, 2, 3, 4, 5];
    expect(rotateLeft(-2, array)).toEqual([4, 5, 1, 2, 3]);
  });

  it('当旋转次数为0时应该返回原数组', () => {
    const array = [1, 2, 3, 4, 5];
    expect(rotateLeft(0, array)).toEqual([1, 2, 3, 4, 5]);
  });

  it('当旋转次数等于数组长度时应该返回原数组', () => {
    const array = [1, 2, 3, 4, 5];
    expect(rotateLeft(5, array)).toEqual([1, 2, 3, 4, 5]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array: number[] = [];
    expect(rotateLeft(2, array)).toEqual([]);
  });

  it('应该支持对象数组', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
    expect(rotateLeft(1, array)).toEqual([{ x: 2 }, { x: 3 }, { x: 1 }]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5];
    const rotateBy2 = rotateLeft(2);
    expect(rotateBy2(array)).toEqual([3, 4, 5, 1, 2]);
  });
});
