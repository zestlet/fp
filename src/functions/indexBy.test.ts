import { describe, it, expect } from 'vitest';
import { indexBy } from './indexBy';

describe('indexBy', () => {
  it('应该根据keyFn返回的键对数组元素进行索引', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    const result = indexBy(item => item.id, array);
    expect(result).toEqual({
      1: { id: 1, name: 'Alice' },
      2: { id: 2, name: 'Bob' },
      3: { id: 3, name: 'Charlie' },
    });
  });

  it('应该支持字符串键', () => {
    const array = [
      { name: 'Alice', age: 20 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 40 },
    ] as const;
    const result = indexBy(item => item.name, array);
    expect(result).toEqual({
      Alice: { name: 'Alice', age: 20 },
      Bob: { name: 'Bob', age: 30 },
      Charlie: { name: 'Charlie', age: 40 },
    });
  });

  it('当数组为空时应该返回空对象', () => {
    const array = [] as const;
    const result = indexBy((item: { id: PropertyKey }) => item.id, array);
    expect(result).toEqual({});
  });

  it('应该支持柯里化调用', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ] as const;
    const indexById = indexBy(item => (item as any).id as PropertyKey);
    const result = indexById(array);
    expect(result).toEqual({
      1: { id: 1, name: 'Alice' },
      2: { id: 2, name: 'Bob' },
    });
  });
});
