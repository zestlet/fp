import { describe, it, expect } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('应该返回一个打乱顺序的数组', () => {
    const array = [1, 2, 3, 4, 5];
    const result = shuffle(array);
    expect(result).toHaveLength(array.length);
    expect(result.sort()).toEqual(array.sort());
  });

  it('当数组为空时应该返回空数组', () => {
    const array: number[] = [];
    expect(shuffle(array)).toEqual([]);
  });

  it('当数组只有一个元素时应该返回相同数组', () => {
    const array = [1];
    expect(shuffle(array)).toEqual([1]);
  });

  it('应该支持对象数组', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
    const result = shuffle(array);
    expect(result).toHaveLength(array.length);
    expect(result.map(item => item.x).sort()).toEqual([1, 2, 3]);
  });

  it('应该保持数组元素的唯一性', () => {
    const array = [1, 1, 2, 2, 3, 3];
    const result = shuffle(array);
    expect(result).toHaveLength(array.length);
    expect(result.sort()).toEqual(array.sort());
  });
});
