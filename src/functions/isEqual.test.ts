import { describe, expect, it } from 'vitest';
import { isEqual } from './isEqual';

describe('isEqual', () => {
  it('应该正确比较基本类型', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('a', 'a')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);
    expect(isEqual(Symbol('a'), Symbol('a'))).toBe(false);
    expect(isEqual(NaN, NaN)).toBe(true);
    expect(isEqual(0, -0)).toBe(true);
    expect(isEqual(Infinity, Infinity)).toBe(true);
    expect(isEqual(-Infinity, -Infinity)).toBe(true);
  });

  it('应该正确比较对象', () => {
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
    expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);
    expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });

  it('应该正确比较数组', () => {
    expect(isEqual([], [])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(isEqual([1, 2, 3], [1, 3, 2])).toBe(false);
  });

  it('应该正确处理循环引用', () => {
    const obj1: any = { a: 1 };
    obj1.self = obj1;
    const obj2: any = { a: 1 };
    obj2.self = obj2;
    expect(isEqual(obj1, obj2)).toBe(true);

    const arr1: any[] = [1];
    arr1.push(arr1);
    const arr2: any[] = [1];
    arr2.push(arr2);
    expect(isEqual(arr1, arr2)).toBe(true);
  });

  it('应该正确处理特殊对象', () => {
    expect(isEqual(new Date('2023-01-01'), new Date('2023-01-01'))).toBe(true);
    expect(isEqual(new Date('2023-01-01'), new Date('2023-01-02'))).toBe(false);
    expect(isEqual(/a/, /a/)).toBe(true);
    expect(isEqual(/a/, /b/)).toBe(false);
    expect(isEqual(new Error('test'), new Error('test'))).toBe(true);
    expect(isEqual(new Error('test1'), new Error('test2'))).toBe(false);
  });

  it('应该正确处理类型不同的情况', () => {
    expect(isEqual(1, '1')).toBe(false);
    expect(isEqual(true, 1)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
    expect(isEqual({}, [])).toBe(false);
    expect(isEqual(new Number(1), 1)).toBe(true);
    expect(isEqual(new String('a'), 'a')).toBe(true);
    expect(isEqual(new Boolean(true), true)).toBe(true);
  });

  it('应该正确处理函数', () => {
    const fn1 = () => {};
    const fn2 = () => {};
    expect(isEqual(fn1, fn1)).toBe(true);
    expect(isEqual(fn1, fn2)).toBe(false);
  });

  it('应该正确处理 Map 和 Set', () => {
    expect(isEqual(new Map(), new Map())).toBe(true);
    expect(isEqual(new Map([['a', 1]]), new Map([['a', 1]]))).toBe(true);
    expect(isEqual(new Map([['a', 1]]), new Map([['a', 2]]))).toBe(false);
    expect(isEqual(new Set(), new Set())).toBe(true);
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2, 3]))).toBe(true);
    expect(isEqual(new Set([1, 2, 3]), new Set([1, 2]))).toBe(false);
  });

  it('应该正确处理 TypedArray', () => {
    expect(isEqual(new Int8Array([1, 2, 3]), new Int8Array([1, 2, 3]))).toBe(true);
    expect(isEqual(new Int8Array([1, 2, 3]), new Int8Array([1, 2]))).toBe(false);
    expect(isEqual(new Uint8Array([1, 2, 3]), new Uint8Array([1, 2, 3]))).toBe(true);
    expect(isEqual(new Int16Array([1, 2, 3]), new Int16Array([1, 2, 3]))).toBe(true);
  });

  it('应该正确处理 ArrayBuffer', () => {
    const buffer1 = new ArrayBuffer(8);
    const buffer2 = new ArrayBuffer(8);
    const buffer3 = new ArrayBuffer(16);
    expect(isEqual(buffer1, buffer1)).toBe(true);
    expect(isEqual(buffer1, buffer2)).toBe(true);
    expect(isEqual(buffer1, buffer3)).toBe(false);
  });

  it('应该正确处理 DataView', () => {
    const buffer = new ArrayBuffer(8);
    const view1 = new DataView(buffer);
    const view2 = new DataView(buffer);
    const view3 = new DataView(new ArrayBuffer(9));
    expect(isEqual(view1, view1)).toBe(true);
    expect(isEqual(view1, view2)).toBe(true);
    expect(isEqual(view1, view3)).toBe(false);
  });

  it('应该正确处理生成器函数', () => {
    const gen1 = function* () {
      yield 1;
    };
    const gen2 = function* () {
      yield 1;
    };
    const gen3 = function* () {
      yield 2;
    };
    expect(isEqual(gen1, gen1)).toBe(true);
    expect(isEqual(gen1, gen2)).toBe(false);
    expect(isEqual(gen1, gen3)).toBe(false);
  });

  it('应该正确处理异步生成器函数', () => {
    const asyncGen1 = async function* () {
      yield 1;
    };
    const asyncGen2 = async function* () {
      yield 1;
    };
    const asyncGen3 = async function* () {
      yield 2;
    };
    expect(isEqual(asyncGen1, asyncGen1)).toBe(true);
    expect(isEqual(asyncGen1, asyncGen2)).toBe(false);
    expect(isEqual(asyncGen1, asyncGen3)).toBe(false);
  });

  it('应该正确处理 Intl 对象', () => {
    const collator1 = new Intl.Collator('en');
    const collator2 = new Intl.Collator('en');
    const collator3 = new Intl.Collator('fr');
    expect(isEqual(collator1, collator1)).toBe(true);
    expect(isEqual(collator1, collator2)).toBe(false);
    expect(isEqual(collator1, collator3)).toBe(false);

    const dateTime1 = new Intl.DateTimeFormat('en');
    const dateTime2 = new Intl.DateTimeFormat('en');
    const dateTime3 = new Intl.DateTimeFormat('fr');
    expect(isEqual(dateTime1, dateTime1)).toBe(true);
    expect(isEqual(dateTime1, dateTime2)).toBe(false);
    expect(isEqual(dateTime1, dateTime3)).toBe(false);
  });

  it('应该正确处理 SharedArrayBuffer', () => {
    const sab1 = new SharedArrayBuffer(8);
    const sab2 = new SharedArrayBuffer(8);
    const sab3 = new SharedArrayBuffer(16);
    expect(isEqual(sab1, sab1)).toBe(true);
    expect(isEqual(sab1, sab2)).toBe(true);
    expect(isEqual(sab1, sab3)).toBe(false);
  });

  it('应该正确处理 FinalizationRegistry', () => {
    const registry1 = new FinalizationRegistry(() => {});
    const registry2 = new FinalizationRegistry(() => {});
    expect(isEqual(registry1, registry1)).toBe(true);
    expect(isEqual(registry1, registry2)).toBe(false);
  });

  it('应该正确处理 WeakRef', () => {
    const obj1 = {};
    const obj2 = {};
    const ref1 = new WeakRef(obj1);
    const ref2 = new WeakRef(obj1);
    const ref3 = new WeakRef(obj2);
    expect(isEqual(ref1, ref1)).toBe(true);
    expect(isEqual(ref1, ref2)).toBe(false);
    expect(isEqual(ref1, ref3)).toBe(false);
  });

  it('应该正确处理 Math 和 JSON', () => {
    expect(isEqual(Math, Math)).toBe(true);
    expect(isEqual(JSON, JSON)).toBe(true);
    expect(isEqual(Math, JSON)).toBe(false);
  });

  it('应该正确处理 Atomics', () => {
    const sab1 = new SharedArrayBuffer(8);
    const sab2 = new SharedArrayBuffer(8);
    const view1 = new Int32Array(sab1);
    const view2 = new Int32Array(sab2);
    Atomics.store(view1, 0, 1);
    Atomics.store(view2, 0, 1);
    expect(isEqual(view1, view1)).toBe(true);
    expect(isEqual(view1, view2)).toBe(true);
  });

  it('应该正确处理复杂嵌套对象', () => {
    const obj1 = {
      a: 1,
      b: {
        c: [1, 2, { d: 3 }],
        e: new Date('2023-01-01'),
        f: /test/i,
        g: new Map<string, unknown>([
          ['x', { y: 1 }],
          ['z', new Set([1, 2, 3])],
        ]),
        h: new Error('test'),
        i: new Int8Array([1, 2, 3]),
        j: new ArrayBuffer(8),
        k: new DataView(new ArrayBuffer(8)),
      },
    };

    const obj2 = {
      a: 1,
      b: {
        c: [1, 2, { d: 3 }],
        e: new Date('2023-01-01'),
        f: /test/i,
        g: new Map<string, unknown>([
          ['x', { y: 1 }],
          ['z', new Set([1, 2, 3])],
        ]),
        h: new Error('test'),
        i: new Int8Array([1, 2, 3]),
        j: new ArrayBuffer(8),
        k: new DataView(new ArrayBuffer(8)),
      },
    };

    const obj3 = {
      a: 1,
      b: {
        c: [1, 2, { d: 4 }],
        e: new Date('2023-01-01'),
        f: /test/i,
        g: new Map<string, unknown>([
          ['x', { y: 1 }],
          ['z', new Set([1, 2, 3])],
        ]),
        h: new Error('test'),
        i: new Int8Array([1, 2, 3]),
        j: new ArrayBuffer(8),
        k: new DataView(new ArrayBuffer(8)),
      },
    };

    expect(isEqual(obj1, obj1)).toBe(true);
    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false);
  });

  it('应该正确处理循环引用的复杂对象', () => {
    const createCircular = () => {
      const obj: any = {
        a: 1,
        b: {
          c: [1, 2, 3],
          d: new Date('2023-01-01'),
          e: /test/i,
        },
      };
      obj.self = obj;
      obj.b.parent = obj;
      obj.b.c.push(obj);
      return obj;
    };

    const obj1 = createCircular();
    const obj2 = createCircular();
    const obj3 = createCircular();
    obj3.b.c[0] = 2;

    expect(isEqual(obj1, obj1)).toBe(true);
    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false);
  });

  it('应该正确处理混合类型的数组', () => {
    const arr1 = [
      1,
      'string',
      true,
      null,
      undefined,
      Symbol.for('test'),
      new Date('2023-01-01'),
      /test/i,
      new Error('test'),
      new Map([['a', 1]]),
      new Set([1, 2, 3]),
      new Int8Array([1, 2, 3]),
      new ArrayBuffer(8),
      new DataView(new ArrayBuffer(8)),
      { a: 1, b: [2, 3] },
      [4, 5, { c: 6 }],
    ];

    const arr2 = [
      1,
      'string',
      true,
      null,
      undefined,
      Symbol.for('test'),
      new Date('2023-01-01'),
      /test/i,
      new Error('test'),
      new Map([['a', 1]]),
      new Set([1, 2, 3]),
      new Int8Array([1, 2, 3]),
      new ArrayBuffer(8),
      new DataView(new ArrayBuffer(8)),
      { a: 1, b: [2, 3] },
      [4, 5, { c: 6 }],
    ];

    const arr3 = [
      1,
      'string',
      true,
      null,
      undefined,
      Symbol.for('test'),
      new Date('2023-01-01'),
      /test/i,
      new Error('test'),
      new Map([['a', 1]]),
      new Set([1, 2, 3]),
      new Int8Array([1, 2, 3]),
      new ArrayBuffer(8),
      new DataView(new ArrayBuffer(8)),
      { a: 1, b: [2, 4] },
      [4, 5, { c: 6 }],
    ];

    expect(isEqual(arr1, arr1)).toBe(true);
    expect(isEqual(arr1, arr2)).toBe(true);
    expect(isEqual(arr1, arr3)).toBe(false);
  });

  it('应该正确处理特殊值的嵌套', () => {
    const obj1 = {
      a: NaN,
      b: {
        c: [Infinity, -Infinity, 0, -0],
        d: {
          e: new Date(NaN),
          f: new Error(''),
          g: new RegExp(''),
          h: new Map([[NaN, Infinity]]),
          i: new Set([NaN, Infinity, -Infinity]),
        },
      },
    };

    const obj2 = {
      a: NaN,
      b: {
        c: [Infinity, -Infinity, 0, -0],
        d: {
          e: new Date(NaN),
          f: new Error(''),
          g: new RegExp(''),
          h: new Map([[NaN, Infinity]]),
          i: new Set([NaN, Infinity, -Infinity]),
        },
      },
    };

    const obj3 = {
      a: NaN,
      b: {
        c: [Infinity, -Infinity, 0, -0],
        d: {
          e: new Date(NaN),
          f: new Error('test'),
          g: new RegExp(''),
          h: new Map([[NaN, Infinity]]),
          i: new Set([NaN, Infinity, -Infinity]),
        },
      },
    };

    expect(isEqual(obj1, obj1)).toBe(true);
    expect(isEqual(obj1, obj2)).toBe(true);
    expect(isEqual(obj1, obj3)).toBe(false);
  });

  it('应该正确处理包装器', () => {
    const obj1 = new Number(1);
    const obj2 = new Number(1);

    expect(isEqual(obj1, obj1)).toBe(true);
    expect(isEqual(obj1, obj2)).toBe(true);

    const bigInt1 = BigInt(1);
    const bigInt2 = BigInt(1);
    expect(isEqual(bigInt1, bigInt1)).toBe(true);
    expect(isEqual(bigInt1, bigInt2)).toBe(true);

    const bigInt1Wrapped = Object(bigInt1);
    const bigInt2Wrapped = Object(bigInt2);
    expect(isEqual(bigInt1Wrapped, bigInt1Wrapped)).toBe(true);
    expect(isEqual(bigInt1Wrapped, bigInt2Wrapped)).toBe(true);

    const symbol1 = Symbol.for('test');
    const symbol2 = Symbol.for('test');
    expect(isEqual(symbol1, symbol1)).toBe(true);
    expect(isEqual(symbol1, symbol2)).toBe(true);

    const symbol1Wrapped = Object(symbol1);
    const symbol2Wrapped = Object(symbol2);

    expect(isEqual(symbol1Wrapped, symbol1Wrapped)).toBe(true);
    expect(isEqual(symbol1Wrapped, symbol2Wrapped)).toBe(true);
  });
});
