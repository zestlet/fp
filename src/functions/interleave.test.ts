import { describe, it, expect } from 'vitest';
import { interleave } from './interleave';

describe('interleave', () => {
  it('应该将两个数组的元素交替插入', () => {
    const array1 = [1, 2, 3] as const;
    const array2 = ['a', 'b', 'c'] as const;
    expect(interleave(array2, array1)).toEqual([1, 'a', 2, 'b', 3, 'c']);
  });

  it('当第一个数组为空时应该返回第二个数组', () => {
    const array1 = [] as const;
    const array2 = ['a', 'b', 'c'] as const;
    expect(interleave(array2, array1)).toEqual(['a', 'b', 'c']);
  });

  it('当第二个数组为空时应该返回第一个数组', () => {
    const array1 = [1, 2, 3] as const;
    const array2 = [] as const;
    expect(interleave(array2, array1)).toEqual([1, 2, 3]);
  });

  it('当两个数组都为空时应该返回空数组', () => {
    const array1 = [] as const;
    const array2 = [] as const;
    expect(interleave(array2, array1)).toEqual([]);
  });

  it('当两个数组长度不同时应该正确处理', () => {
    const array1 = [1, 2] as const;
    const array2 = ['a', 'b', 'c', 'd'] as const;
    expect(interleave(array2, array1)).toEqual([1, 'a', 2, 'b', 'c', 'd']);
  });

  it('应该支持对象数组', () => {
    const array1 = [{ id: 1 }, { id: 2 }] as const;
    const array2 = [{ name: 'Alice' }, { name: 'Bob' }] as const;
    expect(interleave(array2, array1)).toEqual([{ id: 1 }, { name: 'Alice' }, { id: 2 }, { name: 'Bob' }]);
  });

  it('应该支持柯里化调用', () => {
    const array1 = [1, 2, 3] as const;
    const array2 = ['a', 'b', 'c'] as const;
    const interleaveWithArray1 = interleave(array2);
    expect(interleaveWithArray1(array1)).toEqual([1, 'a', 2, 'b', 3, 'c']);
  });
});
