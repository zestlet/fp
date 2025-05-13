import { describe, it, expect, vi } from 'vitest';
import { sample } from './sample';

describe('sample', () => {
  it('应该从数组中随机返回一个元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const result = sample(array);
    expect(array).toContain(result);
  });

  it('当数组为空时应该返回 undefined', () => {
    const array = [] as const;
    expect(sample(array)).toBeUndefined();
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    const result = sample(array);
    expect(array).toContain(result);
  });

  it('应该使用 Math.random 进行随机选择', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const randomSpy = vi.spyOn(Math, 'random');
    randomSpy.mockReturnValue(0.5);

    const result = sample(array);
    expect(result).toBe(3); // 0.5 * 5 = 2.5, Math.floor(2.5) = 2, array[2] = 3

    randomSpy.mockRestore();
  });
});
