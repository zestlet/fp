import { describe, it, expect } from 'vitest';
import { zipObj } from './zipObj';

describe('zipObj', () => {
  it('应该将两个列表的元素一一对应地组合成对象', () => {
    const keys = ['a', 'b', 'c'] as const;
    const values = [1, 2, 3] as const;
    expect(zipObj(keys, values)).toEqual({ a: 1, b: 2, c: 3 });
  });

  it('应该处理键列表长度大于值列表长度的情况', () => {
    const keys = ['a', 'b', 'c', 'd'] as const;
    const values = [1, 2] as const;
    expect(zipObj(keys, values)).toEqual({ a: 1, b: 2 });
  });

  it('应该处理值列表长度大于键列表长度的情况', () => {
    const keys = ['a', 'b'] as const;
    const values = [1, 2, 3, 4] as const;
    expect(zipObj(keys, values)).toEqual({ a: 1, b: 2 });
  });

  it('应该支持不同类型的值', () => {
    const keys = ['a', 'b', 'c', 'd', 'e'] as const;
    const values = [1, '2', true, [1, 2, 3], { x: 1, y: 2 }] as const;
    expect(zipObj(keys, values)).toEqual({
      a: 1,
      b: '2',
      c: true,
      d: [1, 2, 3],
      e: { x: 1, y: 2 },
    });
  });

  it('应该处理空列表', () => {
    const keys = [] as const;
    const values = [] as const;
    expect(zipObj(keys, values)).toEqual({});
  });

  it('应该支持柯里化调用', () => {
    const keys = ['a', 'b'] as const;
    const values = [1, 2] as const;
    const zipObjWithKeys = zipObj(keys);
    expect(zipObjWithKeys(values)).toEqual({ a: 1, b: 2 });
  });
});
