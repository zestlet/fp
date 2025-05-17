import { describe, it, expect } from 'vitest';
import { pathToArray } from './pathToArray';

describe('pathToArray', () => {
  it('应该将点分隔的路径字符串转换为数组', () => {
    expect(pathToArray('a.b.c')).toEqual(['a', 'b', 'c']);
    expect(pathToArray('user.profile.name')).toEqual(['user', 'profile', 'name']);
  });

  it('当路径为空字符串时应该返回空数组', () => {
    expect(pathToArray('')).toEqual([]);
  });

  it('当路径没有分隔符时应该返回单元素数组', () => {
    expect(pathToArray('name')).toEqual(['name']);
  });

  it('应该正确处理连续的点和点号', () => {
    expect(pathToArray('a..b')).toEqual(['a', 'b']);
    expect(pathToArray('...')).toEqual([]);
  });

  it('应该支持数字作为属性名', () => {
    expect(pathToArray('user.0.name')).toEqual(['user', '0', 'name']);
    expect(pathToArray('a.1.b.2')).toEqual(['a', '1', 'b', '2']);
  });

  it('应该支持特殊字符作为属性名', () => {
    expect(pathToArray('user.profile-name')).toEqual(['user', 'profile-name']);
    expect(pathToArray('user.profile_name')).toEqual(['user', 'profile_name']);
  });

  it('应该支持数组索引', () => {
    expect(pathToArray('user.profile[0].name')).toEqual(['user', 'profile', 0, 'name']);
    expect(pathToArray('a[1].b[2]')).toEqual(['a', 1, 'b', 2]);
  });

  it('应该支持混合路径格式', () => {
    expect(pathToArray('user.profile[0].1.name[2]')).toEqual(['user', 'profile', 0, '1', 'name', 2]);
    expect(pathToArray('a.1.b[2].c[3].4')).toEqual(['a', '1', 'b', 2, 'c', 3, '4']);
  });
});
