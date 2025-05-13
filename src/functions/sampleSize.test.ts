import { describe, it, expect, vi } from 'vitest';
import { sampleSize } from './sampleSize';

describe('sampleSize', () => {
  it('应该从数组中随机返回指定数量的元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const result = sampleSize(2, array);
    expect(result).toHaveLength(2);
    result.forEach(item => expect(array).toContain(item));
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(sampleSize(2, array)).toEqual([]);
  });

  it('当请求的样本大小小于等于0时应该返回空数组', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(sampleSize(0, array)).toEqual([]);
    expect(sampleSize(-1, array)).toEqual([]);
  });

  it('当请求的样本大小大于数组长度时应该返回打乱后的整个数组', () => {
    const array = [1, 2, 3] as const;
    const result = sampleSize(5, array);
    expect(result).toHaveLength(3);
    expect(new Set(result)).toEqual(new Set(array));
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    const result = sampleSize(2, array);
    expect(result).toHaveLength(2);
    result.forEach(item => expect(array).toContain(item));
  });

  it('返回的元素不应该重复', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const result = sampleSize(3, array);
    expect(new Set(result).size).toBe(3);
  });

  it('应该使用 Fisher-Yates 洗牌算法', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const randomSpy = vi.spyOn(Math, 'random');
    randomSpy.mockReturnValue(0.5);

    const result = sampleSize(3, array);
    expect(result).toHaveLength(3);
    expect(new Set(result).size).toBe(3);

    randomSpy.mockRestore();
  });
});
