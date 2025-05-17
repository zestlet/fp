import { describe, it, expect } from 'vitest';
import { findMap } from './findMap';

describe('findMap', () => {
  it('应该找到并转换第一个满足条件的元素', () => {
    const array = [1, 2, 3, 4, 5];
    const result = findMap(undefined, x => (x > 3 ? x * 2 : undefined), array);
    expect(result).toBe(8);
  });

  it('当没有元素满足条件时应该返回默认值', () => {
    const array = [1, 2, 3, 4, 5];
    const result = findMap('not found', x => (x > 10 ? x * 2 : undefined), array);
    expect(result).toBe('not found');
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    const result = findMap(undefined, x => (x.id > 1 ? x.name.toUpperCase() : undefined), array);
    expect(result).toBe('BOB');
  });

  it('当输入为空数组时应该返回默认值', () => {
    const result = findMap('empty', x => (x > 0 ? x * 2 : undefined), []);
    expect(result).toBe('empty');
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5];
    const findAndDouble = findMap(undefined);
    const result = findAndDouble(x => (x > 3 ? x * 2 : undefined), array);
    expect(result).toBe(8);
  });

  it('应该正确处理undefined和null值', () => {
    const array = [1, undefined, 3, null, 5];
    const result = findMap('not found', x => (x == null ? 'found' : undefined), array);
    expect(result).toBe('found');
  });

  it('应该支持复杂条件检查', () => {
    const array = [
      { id: 1, name: 'Alice', age: 20 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 25 },
    ];
    const result = findMap('not found', x => (x.age >= 25 && x.name.length > 3 ? `${x.name} is ${x.age} years old` : undefined), array);
    expect(result).toBe('Charlie is 25 years old');
  });
});
