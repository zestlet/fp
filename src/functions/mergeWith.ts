import { curry } from './curry';
import { isPlainObject, isObject } from './guard';

interface MergeWithContext {
  key: string | number;
  path: (string | number)[];
  source: any;
  target: any;
}

export type MergeDeleteSymbol = {
  readonly __deleteProperty: unique symbol;
};

export const mergeDeleteSymbol = Symbol('mergeDelete') as unknown as MergeDeleteSymbol;

export type MergeWithCustomizer = (sourceValue: any, targetValue: any, context: MergeWithContext) => any;

function createMerger<T extends object, S extends object>(
  customizer: MergeWithCustomizer | null | undefined,
  immutable: boolean
): (target: T, source: S) => T & S {
  return (target: T, source: S): T & S => {
    // 使用WeakMap跟踪已处理的对象，避免循环引用
    const visited = new WeakMap<object, object>();

    function mergeInner(target: any, source: any, path: (string | number)[] = [], parentTarget: any = null, parentSource: any = null): any {
      // 1. 处理基本情况

      // 如果源值是null或undefined，直接返回源值
      if (source === null || source === undefined) {
        return source;
      }

      // 如果目标值是null或undefined，直接返回源值
      if (target === null || target === undefined) {
        return source;
      }

      // 2. 处理循环引用

      // 源对象循环引用检查
      if (isObject(source)) {
        if (visited.has(source)) {
          return visited.get(source);
        }
      }

      // 目标对象循环引用检查
      if (isObject(target)) {
        if (visited.has(target)) {
          return visited.get(target);
        }
      }

      // 3. 应用自定义合并函数（对所有非顶层属性）

      const currentKey = path.length > 0 ? path[path.length - 1] : '';

      if (customizer && path.length > 0) {
        const context: MergeWithContext = {
          key: currentKey,
          path: path,
          source: parentSource || source,
          target: parentTarget || target,
        };

        const customResult = customizer(source, target, context);
        // 特殊处理删除标记
        if (customResult === mergeDeleteSymbol) {
          return mergeDeleteSymbol;
        }
        // 处理其他自定义结果
        if (customResult !== undefined) {
          return customResult;
        }
      }

      // 4. 根据类型进行合并

      // 如果两者都是普通对象，进行递归合并
      if (isPlainObject(target) && isPlainObject(source)) {
        // 不可变版本创建新对象，可变版本使用原对象
        const result = immutable ? { ...target } : target;

        // 记录到已访问映射中，防止循环引用
        if (immutable) {
          visited.set(source, result);
          visited.set(target, result);
        } else {
          visited.set(source, target);
        }

        // 合并源对象的所有属性
        Object.keys(source).forEach(key => {
          const targetValue = target[key];
          const sourceValue = source[key];
          const currentPath = [...path, key];

          const mergedValue = mergeInner(targetValue, sourceValue, currentPath, target, source);

          // 处理删除属性的特殊标记
          if (mergedValue === mergeDeleteSymbol) {
            if (immutable) {
              delete result[key];
            } else if (key in result) {
              delete result[key];
            }
          } else {
            // 正常赋值，包括undefined
            result[key] = mergedValue;
          }
        });

        return result;
      }

      // 5. 默认行为：使用源值
      return source;
    }

    // 如果任一参数不是对象，直接返回source
    if (!isObject(target) || !isObject(source)) {
      return source as unknown as T & S;
    }

    return mergeInner(target, source) as T & S;
  };
}

export function mergeWithImpl<T extends object, S extends object>(
  customizer: MergeWithCustomizer | null | undefined,
  target: T,
  source: S
): T & S {
  return createMerger<T, S>(customizer, true)(target, source);
}

export function mergeWithInPlaceImpl<T extends object, S extends object>(
  customizer: MergeWithCustomizer | null | undefined,
  target: T,
  source: S
): T & S {
  return createMerger<T, S>(customizer, false)(target, source);
}

/**
 * Deeply merges two objects, supporting custom merge functions and circular reference handling.
 *
 * @category Object
 * @param customizer - The custom merge function
 * @param target - The target object
 * @param source - The source object
 * @returns Returns the merged object
 * @example
 * const target = { a: 1, b: 2 };
 * const source = { b: 3, c: 4 };
 * mergeWith(null, target, source); // { a: 1, b: 3, c: 4 }
 * mergeWith((s, t) => s + t, target, source); // { a: 1, b: 5, c: 4 }
 */
export const mergeWith = curry(mergeWithImpl) as {
  <T extends object, S extends object, Customizer extends MergeWithCustomizer | null | undefined>(
    customizer: Customizer,
    target: T,
    source: S
  ): T & S;
  <T extends object, Customizer extends MergeWithCustomizer | null | undefined>(
    customizer: Customizer,
    target: T
  ): <S extends object>(source: S) => T & S;
  <Customizer extends MergeWithCustomizer | null | undefined>(
    customizer: Customizer
  ): {
    <T extends object, S extends object>(target: T, source: S): T & S;
    <T extends object>(target: T): <S extends object>(source: S) => T & S;
  };
};

/**
 * In-place deep merge of two objects, supporting custom merge functions and circular reference handling.
 *
 * @category Object
 * @param customizer - The custom merge function
 * @param target - The target object
 * @param source - The source object
 * @returns Returns the merged object
 * @example
 * const target = { a: 1, b: 2 };
 * const source = { b: 3, c: 4 };
 * mergeWithInPlace(null, target, source); // { a: 1, b: 3, c: 4 }
 */
export const mergeWithInPlace = curry(mergeWithInPlaceImpl) as {
  <T extends object, S extends object, Customizer extends MergeWithCustomizer | null | undefined>(
    customizer: Customizer,
    target: T,
    source: S
  ): T & S;
  <T extends object, Customizer extends MergeWithCustomizer | null | undefined>(
    customizer: Customizer,
    target: T
  ): <S extends object>(source: S) => T & S;
  <Customizer extends MergeWithCustomizer | null | undefined>(
    customizer: Customizer
  ): {
    <T extends object, S extends object>(target: T, source: S): T & S;
    <T extends object>(target: T): <S extends object>(source: S) => T & S;
  };
};
