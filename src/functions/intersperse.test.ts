import { describe, it, expect } from 'vitest';
import { intersperse } from './intersperse';

describe('intersperse', () => {
  it('应该在数组元素间插入值', () => {
    const array = [1, 2, 3, 4];
    expect(intersperse(0, array)).toEqual([1, 0, 2, 0, 3, 0, 4]);
  });

  it('应该处理空数组', () => {
    const array: number[] = [];
    expect(intersperse(0, array)).toEqual([]);
  });

  it('应该处理单元素数组', () => {
    const array = [1];
    expect(intersperse(0, array)).toEqual([1]);
  });

  it('应该处理对象数组', () => {
    type Item = { id: number };
    type Separator = { type: string };
    const array: Item[] = [{ id: 1 }, { id: 2 }];
    const separator: Separator = { type: 'separator' };
    expect(intersperse(separator, array)).toEqual([{ id: 1 }, { type: 'separator' }, { id: 2 }]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3];
    const intersperseZero = intersperse(0);
    expect(intersperseZero(array)).toEqual([1, 0, 2, 0, 3]);
  });
});
