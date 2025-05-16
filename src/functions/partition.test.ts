import { describe, it, expect } from 'vitest';
import { partition } from './partition';

describe('partition', () => {
  interface TestObject {
    name: string;
    age: number;
    active: boolean;
    email: string;
  }

  const testObj: TestObject = {
    name: 'Alice',
    age: 25,
    active: true,
    email: 'alice@example.com',
  };

  it('基本用法', () => {
    const [picked, omitted] = partition(['name', 'age'], testObj);

    expect(picked).toEqual({
      name: 'Alice',
      age: 25,
    });

    expect(omitted).toEqual({
      active: true,
      email: 'alice@example.com',
    });
  });

  it('柯里化用法', () => {
    const partitionByNameAndAge = partition(['name', 'age']);
    const [picked, omitted] = partitionByNameAndAge(testObj);

    expect(picked).toEqual({
      name: 'Alice',
      age: 25,
    });

    expect(omitted).toEqual({
      active: true,
      email: 'alice@example.com',
    });
  });

  it('空属性列表', () => {
    const [picked, omitted] = partition([], testObj);

    expect(picked).toEqual({});
    expect(omitted).toEqual(testObj);
  });

  it('部分属性', () => {
    const [picked, omitted] = partition(['name'], testObj);

    expect(picked).toEqual({
      name: 'Alice',
    });

    expect(omitted).toEqual({
      age: 25,
      active: true,
      email: 'alice@example.com',
    });
  });

  it('不存在的属性', () => {
    const [picked, omitted] = partition(['nonExistent' as keyof TestObject], testObj);

    expect(picked).toEqual({});
    expect(omitted).toEqual(testObj);
  });

  it('多个不存在的属性', () => {
    const [picked, omitted] = partition(['nonExistent1' as keyof TestObject, 'nonExistent2' as keyof TestObject], testObj);

    expect(picked).toEqual({});
    expect(omitted).toEqual(testObj);
  });

  it('混合存在和不存在的属性', () => {
    const [picked, omitted] = partition(['name', 'nonExistent' as keyof TestObject], testObj);

    expect(picked).toEqual({
      name: 'Alice',
    });

    expect(omitted).toEqual({
      age: 25,
      active: true,
      email: 'alice@example.com',
    });
  });
});
