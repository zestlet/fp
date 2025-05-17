import { describe, it, expect } from 'vitest';
import { cloneDeep } from './cloneDeep';

describe('deepClone', () => {
  describe('原始类型和 Null/Undefined', () => {
    it('应该为 null 输入返回 null', () => {
      expect(cloneDeep(null)).toBeNull();
    });

    it('应该为 undefined 输入返回 undefined', () => {
      expect(cloneDeep(undefined)).toBeUndefined();
    });

    it('应该为数字输入返回相同的数字', () => {
      expect(cloneDeep(123)).toBe(123);
      expect(cloneDeep(NaN)).toBeNaN();
      expect(cloneDeep(Infinity)).toBe(Infinity);
    });

    it('应该为字符串输入返回相同的字符串', () => {
      expect(cloneDeep('hello')).toBe('hello');
    });

    it('应该为布尔值输入返回相同的布尔值', () => {
      expect(cloneDeep(true)).toBe(true);
      expect(cloneDeep(false)).toBe(false);
    });

    it('应该为 BigInt 输入返回相同的 BigInt', () => {
      const bigIntValue = BigInt(12345678901234567890);
      expect(cloneDeep(bigIntValue)).toBe(bigIntValue);
    });

    it('应该为 Symbol 输入返回相同的 Symbol', () => {
      const symbolValue = Symbol('test');
      expect(cloneDeep(symbolValue)).toBe(symbolValue);
    });
  });

  describe('函数', () => {
    it('应该返回原始函数引用', () => {
      const originalFunc = () => console.log('test');
      const clonedFunc = cloneDeep(originalFunc);
      expect(clonedFunc).toBe(originalFunc);
    });
  });

  describe('对象', () => {
    it('应该克隆一个简单的平面对象', () => {
      const original = { a: 1, b: 'string', c: true };
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned).toEqual(original);
    });

    it('应该克隆一个带有嵌套对象的对象', () => {
      const original = { a: 1, b: { c: 2, d: 'nested' } };
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.b).not.toBe(original.b);
      expect(cloned).toEqual(original);
    });

    it('应该克隆一个带有 null 和 undefined 属性的对象', () => {
      const original = { a: null, b: undefined, c: 'value' };
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned).toEqual(original);
      expect(cloned.hasOwnProperty('b')).toBe(true); // undefined 属性应该存在
    });

    it('应该克隆一个带有 symbol 键的对象', () => {
      const symKey = Symbol('key');
      const original = { [symKey]: 'symbolValue', regularKey: 'value' };
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned).toEqual(original);
      expect(cloned[symKey]).toBe('symbolValue');
      const clonedSymbols = Object.getOwnPropertySymbols(cloned);
      expect(clonedSymbols.length).toBe(1);
      // 注意：直接的 symbol 比较 (clonedSymbols[0] === symKey) 不会起作用
      // 如果 symbols 不是全局的。我们检查值。
      expect(cloned[clonedSymbols[0] as keyof typeof cloned]).toBe(original[symKey]);
    });

    it('应该为普通对象保留原型', () => {
      function MyClass(this: any, value: any) {
        this.value = value;
      }
      MyClass.prototype.getValue = function () {
        return this.value;
      };

      const originalInstance = new (MyClass as any)(10);
      const clonedInstance = cloneDeep(originalInstance);

      expect(clonedInstance).not.toBe(originalInstance);
      expect(clonedInstance.value).toBe(10);
      expect(Object.getPrototypeOf(clonedInstance)).toBe(MyClass.prototype);
      expect(typeof (clonedInstance as any).getValue).toBe('function');
      expect((clonedInstance as any).getValue()).toBe(10);
    });

    it('应该处理使用 Object.create(null) 创建的对象', () => {
      const original = Object.create(null);
      original.a = 1;
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.a).toBe(1);
      expect(Object.getPrototypeOf(cloned)).toBeNull();
    });
  });

  describe('数组', () => {
    it('应该克隆一个简单的平面数组', () => {
      const original = [1, 'string', true];
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned).toEqual(original);
    });

    it('应该克隆一个带有嵌套对象的数组', () => {
      const original = [1, { a: 2, b: 'nested' }, [3, 4]];
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned[1]).not.toBe(original[1]);
      expect(cloned[2]).not.toBe(original[2]);
      expect(cloned).toEqual(original);
    });

    it('应该克隆一个空数组', () => {
      const original: any[] = [];
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned).toEqual(original);
      expect(cloned.length).toBe(0);
    });

    it('应该克隆一个带有 null 和 undefined 值的数组', () => {
      const original = [null, undefined, 'value'];
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned).toEqual(original);
      expect(cloned[1]).toBeUndefined();
    });
  });

  describe('日期对象', () => {
    it('应该克隆一个日期对象', () => {
      const original = new Date();
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.getTime()).toBe(original.getTime());
    });

    it('应该克隆一个无效的日期对象', () => {
      const original = new Date(NaN);
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(isNaN(cloned.getTime())).toBe(true);
    });
  });

  describe('正则表达式对象', () => {
    it('应该克隆一个正则表达式对象', () => {
      const original = /test/gi;
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.source).toBe(original.source);
      expect(cloned.flags).toBe(original.flags);
      expect(cloned.lastIndex).toBe(0); // 正则表达式克隆重置 lastIndex
      // original.lastIndex 可能已经改变如果被使用过
      original.test('test'); // 改变 lastIndex
      expect(cloneDeep(original).lastIndex).toBe(0);
    });
  });

  describe('Map 对象', () => {
    it('应该克隆一个带有原始键和值的 Map', () => {
      const original = new Map<any, any>([
        ['a', 1],
        ['b', 'string'],
      ]);
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.size).toBe(original.size);
      expect(cloned.get('a')).toBe(1);
      expect(cloned.get('b')).toBe('string');
      expect(Array.from(cloned.entries())).toEqual(Array.from(original.entries()));
    });

    it('应该克隆一个带有对象键和值的 Map', () => {
      const keyObj = { id: 1 };
      const valueObj = { data: 'test' };
      const original = new Map<any, any>([[keyObj, valueObj]]);
      const cloned = cloneDeep(original);

      expect(cloned).not.toBe(original);
      expect(cloned.size).toBe(1);

      const clonedEntries = Array.from(cloned.entries());
      const originalEntries = Array.from(original.entries());

      expect(clonedEntries[0][0]).not.toBe(originalEntries[0][0]); // 克隆的键对象
      expect(clonedEntries[0][0]).toEqual(originalEntries[0][0]);
      expect(clonedEntries[0][1]).not.toBe(originalEntries[0][1]); // 克隆的值对象
      expect(clonedEntries[0][1]).toEqual(originalEntries[0][1]);
    });

    it('应该克隆一个空 Map', () => {
      const original = new Map();
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.size).toBe(0);
    });
  });

  describe('Set 对象', () => {
    it('应该克隆一个带有原始值的 Set', () => {
      const original = new Set<any>([1, 'string', true]);
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.size).toBe(original.size);
      expect(cloned.has(1)).toBe(true);
      expect(cloned.has('string')).toBe(true);
      expect(Array.from(cloned.values())).toEqual(Array.from(original.values()));
    });

    it('应该克隆一个带有对象值的 Set', () => {
      const objValue = { id: 1 };
      const original = new Set<any>([objValue, { id: 2 }]);
      const cloned = cloneDeep(original);

      expect(cloned).not.toBe(original);
      expect(cloned.size).toBe(original.size);

      const clonedValues = Array.from(cloned.values());
      const originalValues = Array.from(original.values());

      expect(clonedValues[0]).not.toBe(originalValues[0]);
      expect(clonedValues[0]).toEqual(originalValues[0]);
      expect(clonedValues[1]).not.toBe(originalValues[1]);
      expect(clonedValues[1]).toEqual(originalValues[1]);
    });

    it('应该克隆一个空 Set', () => {
      const original = new Set();
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.size).toBe(0);
    });
  });

  describe('类型化数组和缓冲区', () => {
    it('应该克隆一个 ArrayBuffer', () => {
      const originalBuffer = new Uint8Array([1, 2, 3, 4]).buffer;
      const clonedBuffer = cloneDeep(originalBuffer);
      expect(clonedBuffer).not.toBe(originalBuffer);
      expect(clonedBuffer.byteLength).toBe(originalBuffer.byteLength);
      expect(new Uint8Array(clonedBuffer)).toEqual(new Uint8Array(originalBuffer));
    });

    it('应该克隆一个 Uint8Array', () => {
      const original = new Uint8Array([10, 20, 30]);
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.buffer).not.toBe(original.buffer);
      expect(cloned).toEqual(original);
    });

    // 可以为其他 TypedArray 类型添加类似测试
    it('应该克隆一个 Int32Array', () => {
      const original = new Int32Array([-10, 0, 30000]);
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.buffer).not.toBe(original.buffer);
      expect(cloned).toEqual(original);
    });

    it('应该克隆一个 DataView', () => {
      const buffer = new ArrayBuffer(16);
      const original = new DataView(buffer, 4, 8);
      original.setInt32(0, 123456789);
      original.setFloat32(4, 3.14);

      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.buffer).not.toBe(original.buffer); // 缓冲区应该是新的
      expect(cloned.byteLength).toBe(original.byteLength);
      expect(cloned.byteOffset).toBe(original.byteOffset);
      expect(cloned.getInt32(0)).toBe(123456789);
      expect(cloned.getFloat32(4)).toBeCloseTo(3.14);
    });

    it('应该返回相同的 SharedArrayBuffer（因为它们不可克隆）', () => {
      // SharedArrayBuffer 只能在支持的环境中测试 (例如 node 使用 --experimental-shared-memory)
      // Vitest 默认的 Node 环境可能不支持，或者浏览器环境需要特定头部
      // 这里我们假设一个环境，如果不支持，则跳过或预期不同行为
      try {
        const original = new SharedArrayBuffer(16);
        const cloned = cloneDeep(original);
        expect(cloned).toBe(original); // 根据规范，SharedArrayBuffer 按原样返回
      } catch (e: any) {
        if (e.message.includes('SharedArrayBuffer is not defined')) {
          console.warn('跳过 SharedArrayBuffer 测试：此环境不支持。');
        } else {
          throw e;
        }
      }
    });
  });

  describe('错误对象', () => {
    it('应该克隆一个基本的 Error 对象', () => {
      const original = new Error('测试消息');
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.message).toBe(original.message);
      expect(cloned.name).toBe(original.name);
      // 堆栈跟踪可能不同，所以通常不断言完全匹配
    });

    it('应该克隆一个 TypeError 对象', () => {
      const original = new TypeError('另一种类型的错误');
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.message).toBe(original.message);
      expect(cloned.name).toBe(original.name); // 应该是 'TypeError'
      expect(cloned instanceof Error).toBe(true);
      expect(cloned instanceof TypeError).toBe(true);
    });
  });

  describe('包装的原始类型', () => {
    it('应该克隆一个 new String() 对象', () => {
      const original = new String('hello');
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.valueOf()).toBe('hello');
      expect(cloned instanceof String).toBe(true);
    });
    it('应该克隆一个 new Number() 对象', () => {
      const original = new Number(123);
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.valueOf()).toBe(123);
      expect(cloned instanceof Number).toBe(true);
    });
    it('应该克隆一个 new Boolean() 对象', () => {
      const original = new Boolean(true);
      const cloned = cloneDeep(original);
      expect(cloned).not.toBe(original);
      expect(cloned.valueOf()).toBe(true);
      expect(cloned instanceof Boolean).toBe(true);
    });
  });

  describe('循环引用', () => {
    it('应该处理对象中的直接循环引用', () => {
      const original: any = { name: 'original' };
      original.self = original;
      const cloned = cloneDeep(original);

      expect(cloned).not.toBe(original);
      expect(cloned.name).toBe('original');
      expect(cloned.self).toBe(cloned); // 循环引用的关键断言
      expect(cloned.self).not.toBe(original);
    });

    it('应该处理数组中的直接循环引用', () => {
      const original: any[] = [1, 2];
      original.push(original);
      const cloned = cloneDeep(original);

      expect(cloned).not.toBe(original);
      expect(cloned.length).toBe(3);
      expect(cloned[0]).toBe(1);
      expect(cloned[1]).toBe(2);
      expect(cloned[2]).toBe(cloned); // 关键断言
      expect(cloned[2]).not.toBe(original);
    });

    it('应该处理对象之间的相互循环引用', () => {
      const objA: any = { name: 'A' };
      const objB: any = { name: 'B' };
      objA.b = objB;
      objB.a = objA;

      const clonedA = cloneDeep(objA);

      expect(clonedA).not.toBe(objA);
      expect(clonedA.b).not.toBe(objB);
      expect(clonedA.name).toBe('A');
      expect(clonedA.b.name).toBe('B');
      expect(clonedA.b.a).toBe(clonedA); // 相互循环引用的关键断言
    });

    it('应该处理 Map 值中的循环引用', () => {
      const map = new Map<string, any>();
      const circularValue: any = { name: 'circularInMap' };
      circularValue.self = circularValue;
      map.set('key', circularValue);

      const clonedMap = cloneDeep(map);
      const clonedValue = clonedMap.get('key');

      expect(clonedMap).not.toBe(map);
      expect(clonedValue).not.toBe(circularValue);
      expect(clonedValue.name).toBe('circularInMap');
      expect(clonedValue.self).toBe(clonedValue);
    });

    it('应该处理 Set 值中的循环引用', () => {
      const set = new Set<any>();
      const circularValue: any = { name: 'circularInSet' };
      circularValue.self = circularValue;
      set.add(circularValue);

      const clonedSet = cloneDeep(set);
      const clonedValue = Array.from(clonedSet.values())[0];

      expect(clonedSet).not.toBe(set);
      expect(clonedValue).not.toBe(circularValue);
      expect(clonedValue.name).toBe('circularInSet');
      expect(clonedValue.self).toBe(clonedValue);
    });

    it('应该处理复杂的循环结构', () => {
      const a: any = { name: 'a' };
      const b: any = { name: 'b' };
      const c: any = { name: 'c' };
      a.b = b;
      b.c = c;
      c.a = a; // a -> b -> c -> a
      a.list = [b, c];

      const clonedA = cloneDeep(a);

      expect(clonedA).not.toBe(a);
      expect(clonedA.name).toBe('a');
      expect(clonedA.b).not.toBe(b);
      expect(clonedA.b.name).toBe('b');
      expect(clonedA.b.c).not.toBe(c);
      expect(clonedA.b.c.name).toBe('c');
      expect(clonedA.b.c.a).toBe(clonedA); // 循环性检查

      expect(clonedA.list).not.toBe(a.list);
      expect(clonedA.list.length).toBe(2);
      expect(clonedA.list[0]).toBe(clonedA.b); // 元素是克隆的 b
      expect(clonedA.list[1]).toBe(clonedA.b.c); // 元素是克隆的 c
    });
  });

  // 你可以添加更多测试，针对不太常见的类型或特定的边界情况。
});
