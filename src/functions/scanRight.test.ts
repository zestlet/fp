import { describe, it, expect } from 'vitest';
import { scanRight } from './scanRight';

describe('scanRight', () => {
  it('应该从右向左扫描数组并返回所有中间结果', () => {
    const array = [1, 2, 3, 4, 5];
    expect(scanRight((acc, val) => acc - val, 0, array)).toEqual([-15, -14, -12, -9, -5, 0]);
  });

  it('当数组为空且有初始值时应该返回只包含初始值的数组', () => {
    const array: number[] = [];
    expect(scanRight((acc, val) => acc + val, 0, array)).toEqual([0]);
  });

  it('当数组只有一个元素且没有初始值时应该返回包含该元素和初始值的数组', () => {
    const array = [5];
    expect(scanRight((acc, val) => acc + val, 0, array)).toEqual([5, 0]);
  });

  it('应该支持对象数组', () => {
    const array = [{ x: 1 }, { x: 2 }, { x: 3 }];
    expect(scanRight((acc, val) => acc + val.x, 0, array)).toEqual([6, 5, 3, 0]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5];
    const sumRight = scanRight((acc, val: number) => acc + val, 0);
    expect(sumRight(array)).toEqual([15, 14, 12, 9, 5, 0]);
  });
});
