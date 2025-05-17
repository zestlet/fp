export type ObjectKeyMapFn<O extends object, R = unknown, K extends keyof O = keyof O, V = O[K]> = (key: K, value: V, obj: O) => R;
export type ObjectValueMapFn<O extends object, R = unknown, K extends keyof O = keyof O, V = O[K]> = (value: V, key: K, obj: O) => R;

/**
 * 将对象类型的所有属性及其嵌套属性都变为可选
 * @example
 * type User = {
 *   name: string;
 *   profile: {
 *     age: number;
 *     address: {
 *       city: string;
 *     }
 *   }
 * }
 *
 * type PartialUser = DeepPartial<User>;
 * // 等价于:
 * // {
 * //   name?: string;
 * //   profile?: {
 * //     age?: number;
 * //     address?: {
 * //       city?: string;
 * //     }
 * //   }
 * // }
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
