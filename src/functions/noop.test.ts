import { describe, expect, it } from 'vitest';
import { noop } from './noop';

describe('noop', () => {
  it('应该返回 undefined', () => {
    expect(noop()).toBe(undefined);
  });

  it('应该忽略所有参数', () => {
    expect(noop(1, 2, 3)).toBe(undefined);
    expect(noop('test')).toBe(undefined);
    expect(noop({ a: 1 })).toBe(undefined);
    expect(noop([1, 2, 3])).toBe(undefined);
  });

  it('应该正确处理 null 和 undefined 参数', () => {
    expect(noop(null)).toBe(undefined);
    expect(noop(undefined)).toBe(undefined);
  });
});
