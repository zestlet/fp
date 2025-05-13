import { describe, it, expect } from 'vitest';
import { join } from './join';

describe('join', () => {
  it('应该用分隔符连接数组元素', () => {
    const array = [1, 2, 3, 4];
    expect(join(',', array)).toBe('1,2,3,4');
  });

  it('应该处理空数组', () => {
    const array: number[] = [];
    expect(join(',', array)).toBe('');
  });

  it('应该处理字符串数组', () => {
    const array = ['a', 'b', 'c'];
    expect(join('-', array)).toBe('a-b-c');
  });

  it('应该处理混合类型数组', () => {
    const array = [1, 'a', 2, 'b'];
    expect(join('|', array)).toBe('1|a|2|b');
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4];
    const joinWithComma = join(',');
    expect(joinWithComma(array)).toBe('1,2,3,4');
  });
});
