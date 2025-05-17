import { describe, it, expect } from 'vitest';
import { useWith } from './useWith';

describe('useWith', () => {
  it('应该能正确应用转换函数到参数', () => {
    const add = (a: number, b: number) => a + b;
    const double = (n: number) => n * 2;
    const triple = (n: number) => n * 3;

    const addWithTransforms = useWith(add, [double, triple]);
    expect(addWithTransforms(2, 3)).toBe(13); // 2*2 + 3*3
  });

  it('应该能处理字符串转换', () => {
    const concat = (a: string, b: string) => a + b;
    const toUpper = (s: string) => s.toUpperCase();
    const toLower = (s: string) => s.toLowerCase();

    const concatWithTransforms = useWith(concat, [toUpper, toLower]);
    expect(concatWithTransforms('hello', 'WORLD')).toBe('HELLOworld');
  });

  it('应该能处理对象转换', () => {
    const merge = (a: { x: number }, b: { y: number }) => ({ ...a, ...b });
    const addX = (obj: { x: number }) => ({ ...obj, x: obj.x + 1 });
    const addY = (obj: { y: number }) => ({ ...obj, y: obj.y + 1 });

    const mergeWithTransforms = useWith(merge, [addX, addY]);
    expect(mergeWithTransforms({ x: 1 }, { y: 2 })).toEqual({ x: 2, y: 3 });
  });

  it('应该支持柯里化调用', () => {
    const add = (a: number, b: number) => a + b;
    const double = (n: number) => n * 2;
    const triple = (n: number) => n * 3;

    const addWithDouble = useWith(add, [double]);
    expect(addWithDouble(2, 3)).toBe(7); // 2*2 + 3

    const addWithTransforms = useWith(add)([double, triple]);
    expect(addWithTransforms(2, 3)).toBe(13); // 2*2 + 3*3
  });

  it('应该处理未提供转换函数的情况', () => {
    const add = (a: number, b: number) => a + b;
    const double = (n: number) => n * 2;

    const addWithTransform = useWith(add, [double]);
    expect(addWithTransform(2, 3)).toBe(7); // 2*2 + 3
  });

  it('应该处理空转换函数数组', () => {
    const add = (a: number, b: number) => a + b;
    const addWithNoTransforms = useWith(add, []);
    expect(addWithNoTransforms(2, 3)).toBe(5);
  });

  it('应该保持原始函数的类型安全', () => {
    const add = (a: number, b: number) => a + b;
    const double = (n: number) => n * 2;
    const triple = (n: number) => n * 3;

    const addWithTransforms = useWith(add, [double, triple]);
    // @ts-expect-error 类型错误：参数类型不匹配
    expect(addWithTransforms('a', 3)).toEqual(NaN);
  });

  it('参数类型转换安全', () => {
    const add = (a: number, b: number) => a + b;
    const judge = (n: string) => (n === 'a' ? 1 : 0);
    const triple = (n: number) => n * 3;

    const addWithTransforms = useWith(add, [judge, triple]);
    expect(addWithTransforms('a', 3)).toEqual(10);
  });
});
