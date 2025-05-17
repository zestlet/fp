import { describe, it, expect } from 'vitest';
import { compact, FALSY_VALUES } from './compact';

describe('compact', () => {
  it('应该移除所有假值', () => {
    const array = [0, 1, false, 2, '', 3, null, undefined, NaN] as const;
    expect(compact(array)).toEqual([1, 2, 3]);
  });

  it('当数组只包含假值时应该返回空数组', () => {
    const array = [...FALSY_VALUES] as const;
    expect(compact(array)).toEqual([]);
  });

  it('当数组不包含假值时应该返回原数组', () => {
    const array = [1, 2, 3, 'hello', true] as const;
    expect(compact(array)).toEqual(array);
  });

  it('当数组为空时应该返回空数组', () => {
    const array = [] as const;
    expect(compact(array)).toEqual([]);
  });

  it('应该支持对象数组', () => {
    const array = [{ id: 1, name: 'Alice' }, null, { id: 2, name: 'Bob' }, undefined, { id: 3, name: 'Charlie' }] as const;
    expect(compact(array)).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
  });
});
