import { describe, it, expect } from 'vitest';
import { juxt } from './juxt';

describe('juxt', () => {
  it('应该将多个函数应用到同一个值上', () => {
    const fns = [(x: number) => x + 1, (x: number) => x * 2, (x: number) => x ** 2] as const;
    expect(juxt(fns, 2)).toEqual([3, 4, 4]);
  });

  it('应该支持不同类型的返回值', () => {
    const fns = [(x: number) => x.toString(), (x: number) => x > 0, (x: number) => [x, x * 2]] as const;
    expect(juxt(fns, 2)).toEqual(['2', true, [2, 4]]);
  });

  it('应该支持对象参数', () => {
    type Person = { id: number; name: string; age: number };
    const fns = [(x: Person) => x.id, (x: Person) => x.name, (x: Person) => x.age > 18] as const;
    const value = { id: 1, name: 'Alice', age: 20 };
    expect(juxt(fns, value)).toEqual([1, 'Alice', true]);
  });

  it('应该支持空函数数组', () => {
    const fns = [] as const;
    expect(juxt(fns, 2)).toEqual([]);
  });

  it('应该支持柯里化调用', () => {
    const fns = [(x: number) => x + 1, (x: number) => x * 2, (x: number) => `${x}`] as const;
    const juxtWithFns = juxt(fns);
    expect(juxtWithFns(2)).toEqual([3, 4, '2']);

    const fns2 = [] as const;
    const juxtWithFns2 = juxt(fns2);
    expect(juxtWithFns2(2)).toEqual([]);
  });
});
