import { describe, it, expect } from 'vitest';
import { includesBy } from './includesBy';

describe('includesBy', () => {
  it('当数组中存在转换后等于指定值的元素时应该返回 true', () => {
    const array = [1, 2, 3, 4, 5];
    expect(includesBy(x => x * 2, 6, array)).toBe(true);
  });

  it('当数组中不存在转换后等于指定值的元素时应该返回 false', () => {
    const array = [1, 2, 3, 4, 5];
    expect(includesBy(x => x * 2, 11, array)).toBe(false);
  });

  it('应该支持对象数组', () => {
    const users = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ];
    expect(includesBy(user => user.name, 'Alice', users)).toBe(true);
    expect(includesBy(user => user.name, 'David', users)).toBe(false);
  });

  it('当数组为空时应该返回 false', () => {
    expect(includesBy(x => x * 2, 6, [])).toBe(false);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5];
    const includesDouble = includesBy((x: number) => x * 2);
    expect(includesDouble(6, array)).toBe(true);
    expect(includesDouble(11, array)).toBe(false);
  });

  it('应该正确处理undefined和null值', () => {
    const array = [1, undefined, 3, null, 5];
    expect(includesBy(x => x, undefined, array)).toBe(true);
    expect(includesBy(x => x, null, array)).toBe(true);
  });

  it('应该支持复杂的转换函数', () => {
    const array = [
      { id: 1, name: 'Alice', age: 20 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 25 },
    ];
    expect(includesBy(user => `${user.name}-${user.age}`, 'Bob-30', array)).toBe(true);
    expect(includesBy(user => `${user.name}-${user.age}`, 'Alice-30', array)).toBe(false);
  });
});
