import { describe, it, expect, vi } from 'vitest';
import { forEach } from './forEach';

describe('forEach', () => {
  it('应该对数组中的每个元素执行回调函数', () => {
    const array = [1, 2, 3] as const;
    const callback = vi.fn();
    const result = forEach(callback, array);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(callback).toHaveBeenNthCalledWith(1, 1, 0, array);
    expect(callback).toHaveBeenNthCalledWith(2, 2, 1, array);
    expect(callback).toHaveBeenNthCalledWith(3, 3, 2, array);
    expect(result).toBe(array);
  });

  it('当数组为空时不应该执行回调函数', () => {
    const array = [] as const;
    const callback = vi.fn();
    const result = forEach(callback, array);
    expect(callback).not.toHaveBeenCalled();
    expect(result).toBe(array);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3] as const;
    const callback = vi.fn();
    const forEachCallback = forEach(callback);
    const result = forEachCallback(array);
    expect(callback).toHaveBeenCalledTimes(3);
    expect(result).toBe(array);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ] as const;
    const callback = vi.fn();
    const result = forEach(callback, array);
    expect(callback).toHaveBeenCalledTimes(2);
    expect(callback).toHaveBeenNthCalledWith(1, array[0], 0, array);
    expect(callback).toHaveBeenNthCalledWith(2, array[1], 1, array);
    expect(result).toBe(array);
  });
});
