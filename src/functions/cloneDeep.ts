import { getObjectTag, ObjectTags } from '../shared/utils'; // 假设这个文件存在且与 isEqual 中一致

function cloneDeepFn<T>(source: T, visited = new WeakMap<any, any>()): T {
  // 1. 处理原始类型和 null/undefined (它们是不可变的，直接返回)
  // 函数也是直接返回引用，因为复制函数通常没有意义或很复杂
  if (source === null || (typeof source !== 'object' && typeof source !== 'function')) {
    return source;
  }
  if (typeof source === 'function') {
    return source; // 函数通常不进行深拷贝，返回原函数引用
  }

  // 2. 处理循环引用
  if (visited.has(source)) {
    return visited.get(source);
  }

  const tag = getObjectTag(source);
  let clone: any;

  switch (tag) {
    case ObjectTags.Number:
    case ObjectTags.String:
    case ObjectTags.Boolean:
    case ObjectTags.Symbol:
    case ObjectTags.BigInt:
      // 对于包装对象 (e.g., new String('foo'))
      // source.constructor 是 String, Number, Boolean 等
      // source.valueOf() 获取原始值
      clone = new (source as any).constructor((source as any).valueOf());
      break;

    case ObjectTags.Date:
      clone = new Date((source as unknown as Date).getTime());
      break;

    case ObjectTags.RegExp:
      clone = new RegExp((source as unknown as RegExp).source, (source as unknown as RegExp).flags);
      break;

    case ObjectTags.Array:
    case ObjectTags.Arguments: // Arguments 对象可以像数组一样处理
      // 创建一个相同类型的新数组（考虑子类化数组）
      clone = new (source as any).constructor((source as any[]).length);
      visited.set(source, clone); // *必须*在递归调用前设置，以处理循环引用
      for (let i = 0; i < (source as any[]).length; i++) {
        clone[i] = cloneDeepFn((source as any[])[i], visited);
      }
      return clone; // 返回，因为 visited.set 已经在内部处理了

    case ObjectTags.Map:
      clone = new Map();
      visited.set(source, clone);
      (source as unknown as Map<any, any>).forEach((value, key) => {
        clone.set(cloneDeepFn(key, visited), cloneDeepFn(value, visited));
      });
      return clone;

    case ObjectTags.Set:
      clone = new Set();
      visited.set(source, clone);
      (source as unknown as Set<any>).forEach(value => {
        clone.add(cloneDeepFn(value, visited));
      });
      return clone;

    case ObjectTags.ArrayBuffer:
      clone = (source as unknown as ArrayBuffer).slice(0); // slice 创建一个浅拷贝，对于 ArrayBuffer 来说就是深拷贝
      break;

    case ObjectTags.SharedArrayBuffer: // SharedArrayBuffer 不能被克隆，只能共享
      clone = source;
      break;

    case ObjectTags.DataView:
      // DataView 依赖于底层的 ArrayBuffer，所以需要先克隆 buffer
      const bufferClone = cloneDeepFn((source as unknown as DataView).buffer, visited);
      clone = new DataView(bufferClone, (source as unknown as DataView).byteOffset, (source as unknown as DataView).byteLength);
      break;

    case ObjectTags.Int8Array:
    case ObjectTags.Uint8Array:
    case ObjectTags.Uint8ClampedArray:
    case ObjectTags.Int16Array:
    case ObjectTags.Uint16Array:
    case ObjectTags.Int32Array:
    case ObjectTags.Uint32Array: // 你在 isEqual 中有这个，这里也加上
    case ObjectTags.Float32Array:
    case ObjectTags.Float64Array:
    case ObjectTags.BigInt64Array:
    case ObjectTags.BigUint64Array:
      // TypedArrays 可以通过 slice() 或 new Constructor(source) 来克隆
      clone = new (source as any).constructor(source);
      // 或者 clone = (source as any).slice(); 这种方式更通用
      break;

    case ObjectTags.Object:
      // 保留原型链
      clone = Object.create(Object.getPrototypeOf(source));
      visited.set(source, clone); // *必须*在递归调用前设置

      // 复制自身可枚举属性
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          clone[key] = cloneDeepFn((source as any)[key], visited);
        }
      }
      // 复制自身 Symbol 属性
      Object.getOwnPropertySymbols(source).forEach(sym => {
        if (Object.prototype.propertyIsEnumerable.call(source, sym)) {
          clone[sym] = cloneDeepFn((source as any)[sym], visited);
        }
      });
      return clone;

    case ObjectTags.Error:
      // Error 对象比较特殊，通常只复制 message 和 name
      // stack 是运行时生成的，复制它可能没有意义或不准确
      clone = new (source as any).constructor((source as unknown as Error).message);
      clone.name = (source as unknown as Error).name;
      // if ((source as Error).stack) clone.stack = (source as Error).stack; // 可选
      break;

    // 函数类型已在顶部处理，直接返回 source
    // case ObjectTags.Function:
    // case ObjectTags.AsyncFunction:
    // case ObjectTags.GeneratorFunction:
    //   clone = source; // 函数不拷贝，返回原引用
    //   break;

    default:
      // 对于未知或无法处理的类型，可以返回原始对象或抛出错误
      // 返回原始对象可能导致部分浅拷贝，需谨慎
      console.warn(`deepClone: Unsupported type ${tag}. Returning original object.`);
      clone = source;
      break;
  }

  // 对于那些在 switch case 内部没有 return 的情况 (主要是简单对象克隆后)
  // 需要在这里设置 visited 并返回 clone
  if (clone !== source) {
    // 避免将原始类型或函数错误地添加到 visited
    visited.set(source, clone);
  }
  return clone;
}

export const cloneDeep = <T>(source: T): T => {
  return cloneDeepFn(source);
};
