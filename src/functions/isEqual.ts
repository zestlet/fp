import { getObjectTag, ObjectTags } from '../shared/utils';
import { isNaN } from './guard';

function isEqualFn(a: any, b: any, visited = new WeakMap()) {
  // 1. 严格相同 (相同引用、多数原始类型、null、undefined)
  if (a === b) {
    return true;
  }

  // 2. 处理 null 和 undefined
  if (a == null || b == null) {
    return false;
  }

  // 3. 获取内部 [[Class]] 标签
  const aTag = getObjectTag(a);
  const bTag = getObjectTag(b);

  // 4. 如果内部 [[Class]] 标签不同，则它们通常不相等
  if (aTag !== bTag) {
    return false;
  }

  const aType = typeof a;
  const bType = typeof b;

  // 5. 处理循环引用 (现在 typeA === typeB)
  if (aType === 'object') {
    if (visited.has(a)) {
      return visited.get(a) === b;
    }
    visited.set(a, b);
  }
  let aValue: unknown, bValue: unknown;
  let result = true;

  // 6. 根据相同的 [[Class]] 标签处理特定类型
  switch (aTag) {
    case ObjectTags.Number:
      aValue = aType === 'object' ? a.valueOf() : a;
      bValue = bType === 'object' ? b.valueOf() : b;
      result = isNaN(aValue) && isNaN(bValue) ? true : aValue === bValue;
      break;
    case ObjectTags.Boolean:
    case ObjectTags.String:
    case ObjectTags.Symbol:
    case ObjectTags.BigInt:
      aValue = aType === 'object' ? a.valueOf() : a;
      bValue = bType === 'object' ? b.valueOf() : b;
      result = aValue === bValue;
      break;
    case ObjectTags.Date:
      aValue = a.getTime();
      bValue = b.getTime();
      result = isNaN(aValue) && isNaN(bValue) ? true : aValue === bValue;
      break;
    case ObjectTags.RegExp:
      result = a.source === b.source && a.flags === b.flags;
      break;
    case ObjectTags.Array:
    case ObjectTags.Arguments:
      if (a.length !== b.length) {
        result = false;
      } else {
        for (let i = 0; i < a.length; i++) {
          if (!isEqualFn(a[i], b[i], visited)) {
            result = false;
            break;
          }
        }
      }
      break;

    case ObjectTags.Map:
      if (a.size !== b.size) {
        result = false;
      } else {
        for (const [keyA, valA] of a) {
          let foundKeyInB = false;
          for (const keyB of b.keys()) {
            if (isEqualFn(keyA, keyB, visited)) {
              if (!isEqualFn(valA, b.get(keyB), visited)) {
                result = false;
                break;
              }
              foundKeyInB = true;
              break;
            }
          }
          if (!foundKeyInB || !result) {
            result = false;
            break;
          }
        }
      }
      break;

    case ObjectTags.Set:
      if (a.size !== b.size) {
        result = false;
      } else {
        const bValuesCopy = new Set();
        for (const valB of b.values()) {
          bValuesCopy.add(valB);
        }

        for (const valA of a) {
          let foundMatchInB = false;
          for (const valB_copy of bValuesCopy) {
            if (isEqualFn(valA, valB_copy, visited)) {
              bValuesCopy.delete(valB_copy);
              foundMatchInB = true;
              break;
            }
          }
          if (!foundMatchInB) {
            result = false;
            break;
          }
        }
      }
      break;
    case ObjectTags.ArrayBuffer:
    case ObjectTags.SharedArrayBuffer:
      if (a.byteLength !== b.byteLength) {
        result = false;
      } else {
        const aValueView = new Uint8Array(a);
        const bValueView = new Uint8Array(b);
        for (let i = 0; i < a.byteLength; i++) {
          if (aValueView[i] !== bValueView[i]) {
            result = false;
            break;
          }
        }
      }
      break;

    case ObjectTags.DataView:
      // buffer equal
      if (a.byteLength !== b.byteLength || a.byteOffset !== b.byteOffset) {
        result = false;
      } else {
        if (!isEqualFn(a.buffer, b.buffer, visited)) {
          result = false;
        }
      }
      break;

    case ObjectTags.Int8Array:
    case ObjectTags.Uint8Array:
    case ObjectTags.Uint8ClampedArray:
    case ObjectTags.Int16Array:
    case ObjectTags.Uint16Array:
    case ObjectTags.Int32Array:
    case ObjectTags.Uint32Array:
    case ObjectTags.Float32Array:
    case ObjectTags.Float64Array:
    case ObjectTags.BigInt64Array:
    case ObjectTags.BigUint64Array:
      if (a.length !== b.length) {
        result = false;
      } else {
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            result = false;
            break;
          }
        }
      }
      break;
    case ObjectTags.Object:
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);

      if (keysA.length !== keysB.length) {
        result = false;
      } else {
        for (const key of keysA) {
          if (!Object.prototype.hasOwnProperty.call(b, key) || !isEqualFn(a[key], b[key], visited)) {
            result = false;
            break;
          }
        }
      }

      if (result) {
        const symbolsA = Object.getOwnPropertySymbols(a);
        const symbolsB = Object.getOwnPropertySymbols(b);
        if (symbolsA.length !== symbolsB.length) {
          result = false;
        } else {
          for (const symbol of symbolsA) {
            if (!Object.prototype.hasOwnProperty.call(b, symbol) || !isEqualFn(a[symbol], b[symbol], visited)) {
              result = false;
              break;
            }
          }
        }
      }
      break;

    case ObjectTags.Error:
      result = a.name === b.name && a.message === b.message;
      break;
    case ObjectTags.Function:
    case ObjectTags.AsyncFunction:
    case ObjectTags.GeneratorFunction:
      result = false;
      break;
    default:
      result = false;
      break;
  }

  // 7. 如果在递归比较中发现不相等，且 a 是对象，从 visited 中移除记录
  if (!result && aType === 'object') {
    visited.delete(a);
  }

  return result;
}

export const isEqual = (a: unknown, b: unknown) => isEqualFn(a, b);
