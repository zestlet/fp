import { describe, it, expect } from 'vitest';
import { reject } from './reject';

describe('reject', () => {
  it('应该筛选出不满足断言的元素', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(reject(x => x > 3, array)).toEqual([1, 2, 3]);
  });

  it('应该处理所有元素都满足断言的情况', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(reject(x => x < 0, array)).toEqual([1, 2, 3, 4, 5]);
  });

  it('应该处理所有元素都不满足断言的情况', () => {
    const array = [1, 2, 3, 4, 5] as const;
    expect(reject(x => x > 0, array)).toEqual([]);
  });

  it('应该支持对象数组', () => {
    const array = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ] as const;
    expect(reject(x => x.id > 2, array)).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  });

  it('应该处理空数组', () => {
    const array = [] as const;
    expect(reject(x => x > 0, array)).toEqual([]);
  });

  it('应该支持柯里化调用', () => {
    const array = [1, 2, 3, 4, 5] as const;
    const rejectGreaterThan3 = reject((x: number) => x > 3);
    expect(rejectGreaterThan3(array)).toEqual([1, 2, 3]);
  });
});
