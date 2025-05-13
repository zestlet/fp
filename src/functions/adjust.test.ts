import { describe, it, expect } from 'vitest';
import { adjust } from './adjust';

describe('adjust', () => {
  it('应该通过转换函数更新指定位置的元素', () => {
    const array = [1, 2, 3, 4];
    expect(adjust(1, x => x * 2, array)).toEqual([1, 4, 3, 4]);
  });

  it('应该处理负数索引', () => {
    const array = [1, 2, 3, 4];
    expect(adjust(-1, x => x * 2, array)).toEqual([1, 2, 3, 4]);
  });

  it('应该处理超出范围的索引', () => {
    const array = [1, 2, 3, 4];
    expect(adjust(10, x => x * 2, array)).toEqual([1, 2, 3, 4]);
  });

  it('应该处理对象数组', () => {
    type Item = { id: number; value: number };
    const array: Item[] = [
      { id: 1, value: 10 },
      { id: 2, value: 20 },
      { id: 3, value: 30 },
    ];
    expect(adjust(1, item => ({ ...item, value: item.value * 2 }), array)).toEqual([
      { id: 1, value: 10 },
      { id: 2, value: 40 },
      { id: 3, value: 30 },
    ]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4];
    const adjustIndex1 = adjust(1);
    const adjustIndex2 = adjustIndex1(x => (x as number) * 2);
    expect(adjustIndex2(array)).toEqual([1, 4, 3, 4]);
  });
});
