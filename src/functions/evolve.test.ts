import { describe, it, expect } from 'vitest';
import { evolve } from './evolve';

describe('evolve', () => {
  it('应该能转换基本属性', () => {
    const obj = {
      name: 'Alice',
      age: 20,
      active: true,
    };

    const transforms = {
      name: (name: string) => name.toUpperCase(),
      age: (age: number) => age + 1,
      active: (active: boolean) => !active,
    };

    expect(evolve(transforms, obj)).toEqual({
      name: 'ALICE',
      age: 21,
      active: false,
    });
  });

  it('应该能递归转换嵌套对象', () => {
    const obj = {
      user: {
        name: 'Alice',
        profile: {
          email: 'alice@example.com',
          active: true,
        },
      },
    };

    const transforms = {
      user: {
        name: (name: string) => name.toUpperCase(),
        profile: {
          email: (email: string) => email.toLowerCase(),
          active: (active: boolean) => !active,
        },
      },
    };

    expect(evolve(transforms, obj)).toEqual({
      user: {
        name: 'ALICE',
        profile: {
          email: 'alice@example.com',
          active: false,
        },
      },
    });
  });

  it('应该能处理数组属性', () => {
    const obj = {
      scores: [1, 2, 3],
      items: [
        { id: 1, value: 'a' },
        { id: 2, value: 'b' },
      ],
    };

    const transforms = {
      scores: (scores: number[]) => scores.map(n => n * 2),
      items: (items: Array<{ id: number; value: string }>) =>
        items.map(item => ({
          id: item.id * 10,
          value: item.value.toUpperCase(),
        })),
    };

    expect(evolve(transforms, obj)).toEqual({
      scores: [2, 4, 6],
      items: [
        { id: 10, value: 'A' },
        { id: 20, value: 'B' },
      ],
    });
  });

  it('应该保持未指定转换的属性不变', () => {
    const obj = {
      name: 'Alice',
      age: 20,
      email: 'alice@example.com',
    };

    const transforms = {
      name: (name: string) => name.toUpperCase(),
    };
    const result = evolve(transforms, obj);
    expect(result).toEqual({
      name: 'ALICE',
      age: 20,
      email: 'alice@example.com',
    });
  });

  it('应该支持柯里化调用', () => {
    const obj = {
      name: 'Alice',
      age: 20,
    };

    const transforms = {
      name: (name: string) => name.toUpperCase(),
      age: (age: number) => age + 1,
    };

    const evolveWithTransforms = evolve(transforms);
    const result = evolveWithTransforms(obj);
    expect(result).toEqual({
      name: 'ALICE',
      age: 21,
    });
  });

  it('应该处理空对象', () => {
    const obj = {};
    const transforms = {};

    expect(evolve(transforms, obj)).toEqual({});
  });

  it('应该处理 null 和 undefined 值', () => {
    const obj = {
      name: null as string | null,
      age: undefined as number | undefined,
      email: 'alice@example.com',
    };

    const transforms = {
      name: (name: string | null) => name ?? 'Unknown',
      age: (age: number | undefined) => age ?? 0,
      email: (email: string) => email.toUpperCase(),
    };

    expect(evolve(transforms, obj)).toEqual({
      name: 'Unknown',
      age: 0,
      email: 'ALICE@EXAMPLE.COM',
    });
  });

  it('应该处理复杂嵌套结构', () => {
    const obj = {
      user: {
        name: 'Alice',
        scores: [1, 2, 3],
        profile: {
          email: 'alice@example.com',
          settings: {
            theme: 'light',
            notifications: true,
          },
        },
      },
    };

    const transforms = {
      user: {
        name: (name: string) => name.toUpperCase(),
        scores: (scores: number[]) => scores.map(n => n * 2),
        profile: {
          email: (email: string) => email.toLowerCase(),
          settings: {
            theme: (theme: string) => (theme === 'light' ? 'dark' : 'light'),
            notifications: (notifications: boolean) => !notifications,
          },
        },
      },
    };

    expect(evolve(transforms, obj)).toEqual({
      user: {
        name: 'ALICE',
        scores: [2, 4, 6],
        profile: {
          email: 'alice@example.com',
          settings: {
            theme: 'dark',
            notifications: false,
          },
        },
      },
    });
  });
});
