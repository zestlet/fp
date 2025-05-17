import { describe, it, expect } from 'vitest';
import { hasPath } from './hasPath';

describe('hasPath', () => {
  it('当路径存在时应该返回 true', () => {
    const obj = { a: { b: { c: 1 } } };
    expect(hasPath(['a', 'b', 'c'], obj)).toBe(true);
  });

  it('当路径不存在时应该返回 false', () => {
    const obj = { a: { b: { c: 1 } } };
    expect(hasPath(['a', 'b', 'd'], obj)).toBe(false);
  });

  it('当路径中间有 null 或 undefined 时应该返回 false', () => {
    const obj = { a: { b: null, c: undefined } };
    expect(hasPath(['a', 'b', 'c'], obj)).toBe(false);
    expect(hasPath(['a', 'c', 'd'], obj)).toBe(false);
  });

  it('当对象为 null 或 undefined 时应该返回 false', () => {
    expect(hasPath(['a', 'b'], null as any)).toBe(false);
    expect(hasPath(['a', 'b'], undefined as any)).toBe(false);
  });

  it('当路径为空时应该返回 true', () => {
    const obj = { a: 1 };
    expect(hasPath([], obj)).toBe(true);
  });

  it('当对象为空对象时应该返回 false', () => {
    const obj = {};
    expect(hasPath(['a', 'b'], obj)).toBe(false);
  });

  it('应该支持数组索引', () => {
    const obj = { a: [1, 2, 3] };
    expect(hasPath(['a', '0'], obj)).toBe(true);
    expect(hasPath(['a', '3'], obj)).toBe(false);
  });

  it('应该支持柯里化调用', () => {
    const obj = { user: { profile: { name: 'Alice' } } };
    const hasUserProfile = hasPath(['user', 'profile']);
    expect(hasUserProfile(obj)).toBe(true);
    expect(hasUserProfile({ user: { settings: {} } })).toBe(false);
  });

  it('应该支持多层柯里化', () => {
    const obj = { user: { profile: { name: 'Alice' } } };
    const hasUserProfileName = hasPath(['user', 'profile', 'name']);
    expect(hasUserProfileName(obj)).toBe(true);
    expect(hasUserProfileName({ user: { profile: {} } })).toBe(false);
  });
});
