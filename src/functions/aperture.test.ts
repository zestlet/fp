import { describe, it, expect } from 'vitest';
import { aperture } from './aperture';

describe('aperture', () => {
  it('应该生成指定大小的滑动窗口数组', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(aperture(3, array)).toEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ]);
  });

  it('当窗口大小为1时应该返回每个元素的单元素数组', () => {
    const array = [1, 2, 3] as const;
    expect(aperture(1, array)).toEqual([[1], [2], [3]]);
  });

  it('当窗口大小等于数组长度时应该返回原数组的单元素数组', () => {
    const array = [1, 2, 3] as const;
    expect(aperture(3, array)).toEqual([[1, 2, 3]]);
  });

  it('当窗口大小大于数组长度时应该返回空数组', () => {
    const array = [1, 2, 3] as const;
    expect(aperture(4, array)).toEqual([]);
  });

  it('当窗口大小小于等于0时应该返回空数组', () => {
    const array = [1, 2, 3] as const;
    expect(aperture(0, array)).toEqual([]);
    expect(aperture(-1, array)).toEqual([]);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(aperture(1, array)).toEqual([]);
  });

  it('应该保持原数组不变', () => {
    const array = [1, 2, 3] as const;
    aperture(2, array);
    expect(array).toEqual([1, 2, 3]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const aperture3 = aperture(3);
    expect(aperture3(array)).toEqual([
      [1, 2, 3],
      [2, 3, 4],
      [3, 4, 5],
    ]);
  });
});
