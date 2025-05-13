import { describe, it, expect } from 'vitest';
import { dropRepeatsWith } from './dropRepeatsWith';

interface Person {
  id: number;
  name: string;
}

interface Point {
  x: number;
  y: number;
}

describe('dropRepeatsWith', () => {
  it('应该根据比较函数移除数组中连续重复的元素', () => {
    const array: Person[] = [
      { id: 1, name: 'Alice' },
      { id: 1, name: 'Bob' },
      { id: 2, name: 'Charlie' },
      { id: 2, name: 'David' },
    ];
    const compareById = (a: Person, b: Person) => a.id === b.id;
    expect(dropRepeatsWith(compareById, array)).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Charlie' },
    ]);
  });

  it('应该保留非连续的重复元素', () => {
    const array: Person[] = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Charlie' },
      { id: 2, name: 'David' },
    ];
    const compareById = (a: Person, b: Person) => a.id === b.id;
    expect(dropRepeatsWith(compareById, array)).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 1, name: 'Charlie' },
      { id: 2, name: 'David' },
    ]);
  });

  it('应该支持自定义比较函数', () => {
    const array: Point[] = [
      { x: 1, y: 2 },
      { x: 1, y: 3 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
    ];
    const compareByX = (a: Point, b: Point) => a.x === b.x;
    expect(dropRepeatsWith(compareByX, array)).toEqual([
      { x: 1, y: 2 },
      { x: 2, y: 2 },
    ]);
  });

  it('应该支持空数组', () => {
    const array: Person[] = [];
    const compareById = (a: Person, b: Person) => a.id === b.id;
    expect(dropRepeatsWith(compareById, array)).toEqual([]);
  });

  it('应该支持只有一个元素的数组', () => {
    const array: Person[] = [{ id: 1, name: 'Alice' }];
    const compareById = (a: Person, b: Person) => a.id === b.id;
    expect(dropRepeatsWith(compareById, array)).toEqual([{ id: 1, name: 'Alice' }]);
  });

  it('应该支持柯里化调用', () => {
    const array: Person[] = [
      { id: 1, name: 'Alice' },
      { id: 1, name: 'Bob' },
      { id: 2, name: 'Charlie' },
    ];
    const compareById = (a: Person, b: Person) => a.id === b.id;
    const dropRepeatsById = dropRepeatsWith(compareById);
    expect(dropRepeatsById(array)).toEqual([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Charlie' },
    ]);
  });
});
