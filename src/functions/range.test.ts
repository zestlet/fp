import { describe, it, expect } from 'vitest';
import { range } from './range';

describe('range', () => {
  it('应该生成从 from 到 to 的数字序列（不包含 to）', () => {
    expect(range(0, 5, 1)).toEqual([0, 1, 2, 3, 4]);
  });

  it('应该支持自定义步长', () => {
    expect(range(0, 5, 2)).toEqual([0, 2, 4]);
  });

  it('应该支持负数步长', () => {
    expect(range(5, 0, -1)).toEqual([5, 4, 3, 2, 1]);
  });

  it('当 from 等于 to 时应该返回空数组', () => {
    expect(range(5, 5, 1)).toEqual([]);
  });

  it('当步长为 0 时应该返回空数组', () => {
    expect(range(0, 5, 0)).toEqual([]);
  });

  it('应该支持柯里化调用 - 只传 from', () => {
    const rangeFrom0 = range(0);
    expect(rangeFrom0(5, 1)).toEqual([0, 1, 2, 3, 4]);
  });

  it('应该支持柯里化调用 - 传 from 和 to', () => {
    const range0To5 = range(0)(5);
    expect(range0To5(2)).toEqual([0, 2, 4]);
  });

  it('当 from 大于 to 且步长为正数时应该返回空数组', () => {
    expect(range(5, 0, 1)).toEqual([]);
  });

  it('当 from 小于 to 且步长为负数时应该返回空数组', () => {
    expect(range(0, 5, -1)).toEqual([]);
  });
});
