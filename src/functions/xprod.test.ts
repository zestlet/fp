import { describe, it, expect } from 'vitest';
import { xprod } from './xprod';

describe('xprod', () => {
  it('应该计算两个数组的笛卡尔积', () => {
    const array1 = [1, 2] as const;
    const array2 = ['a', 'b'] as const;
    expect(xprod(array2, array1)).toEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
    ]);
  });

  it('当其中一个数组为空时应该返回空数组', () => {
    const array1 = [1, 2] as const;
    const array2 = [] as const;
    expect(xprod(array2, array1)).toEqual([]);
    expect(xprod(array2, array1)).toEqual([]);
  });

  it('当两个数组都为空时应该返回空数组', () => {
    const array1 = [] as const;
    const array2 = [] as const;
    expect(xprod(array2, array1)).toEqual([]);
  });

  it('应该支持柯里化调用', () => {
    const array1 = [1, 2] as const;
    const array2 = ['a', 'b'] as const;
    const xprodWithArray1 = xprod(array2);
    expect(xprodWithArray1(array1)).toEqual([
      [1, 'a'],
      [1, 'b'],
      [2, 'a'],
      [2, 'b'],
    ]);
  });

  it('应该支持对象数组', () => {
    const array1 = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ] as const;
    const array2 = [
      { type: 'A', value: 100 },
      { type: 'B', value: 200 },
    ] as const;
    expect(xprod(array2, array1)).toEqual([
      [
        { id: 1, name: 'Alice' },
        { type: 'A', value: 100 },
      ],
      [
        { id: 1, name: 'Alice' },
        { type: 'B', value: 200 },
      ],
      [
        { id: 2, name: 'Bob' },
        { type: 'A', value: 100 },
      ],
      [
        { id: 2, name: 'Bob' },
        { type: 'B', value: 200 },
      ],
    ]);
  });
});
