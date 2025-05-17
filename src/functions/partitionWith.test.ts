import { describe, it, expect } from 'vitest';
import { partitionWith } from './partitionWith';

describe('partitionWith', () => {
  it('应该根据断言函数正确分割对象属性', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    expect(partitionWith(value => value > 2, obj)).toEqual([
      { c: 3, d: 4 },
      { a: 1, b: 2 },
    ]);
  });

  it('应该支持使用键名进行分割', () => {
    const obj = { name: 'Alice', age: 20, active: true };
    expect(partitionWith((_, key) => key === 'name', obj)).toEqual([{ name: 'Alice' }, { age: 20, active: true }]);
  });

  it('应该支持复杂对象', () => {
    const obj = {
      user: { id: 1, name: 'Alice' },
      settings: { theme: 'dark', notifications: true },
      metadata: { version: '1.0.0' },
    };
    expect(partitionWith(value => typeof value === 'object' && value !== null, obj)).toEqual([
      { metadata: { version: '1.0.0' }, user: { id: 1, name: 'Alice' }, settings: { theme: 'dark', notifications: true } },
      {},
    ]);
  });

  it('当输入为空对象时应该返回两个空对象', () => {
    expect(partitionWith(value => value > 0, {})).toEqual([{}, {}]);
  });

  it('应该支持柯里化调用', () => {
    const obj = { a: 1, b: 2, c: 3 };
    const partitionByValue = partitionWith(value => value > 2);
    expect(partitionByValue(obj)).toEqual([{ c: 3 }, { a: 1, b: 2 }]);
  });

  it('应该正确处理undefined和null值', () => {
    const obj = { a: undefined, b: null, c: 1, d: 2 };
    expect(partitionWith(value => value == null, obj)).toEqual([
      { a: undefined, b: null },
      { c: 1, d: 2 },
    ]);
  });

  it('应该保持原始对象的属性顺序', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4 };
    const [trueObj, falseObj] = partitionWith(value => value > 2, obj);
    expect(Object.keys(trueObj)).toEqual(['c', 'd']);
    expect(Object.keys(falseObj)).toEqual(['a', 'b']);
  });
});
