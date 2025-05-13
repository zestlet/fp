import { curry } from './curry';

function mapKeysImpl<T extends PropertyKey, U, R extends PropertyKey>(
  fn: (key: T, value: U, obj: Record<T, U>) => R,
  obj: Record<T, U>
): Record<R, U> {
  const result = {} as Record<R, U>;

  Object.entries(obj).forEach(([key, value]) => {
    const newKey = fn(key as T, value as U, obj);
    result[newKey] = value as U;
  });

  return result;
}

/**
 * Transforms object keys using a mapping function
 *
 * @category Object
 * @param fn - The function to transform keys
 * @param obj - The object to transform
 * @returns Returns a new object with transformed keys
 * @example
 * const obj = { name: 'John', age: 30 };
 * mapKeys(key => `user_${key}`, obj); // { user_name: 'John', user_age: 30 }
 * mapKeys(key => key.toUpperCase())(obj); // { NAME: 'John', AGE: 30 }
 */
export const mapKeys = curry(mapKeysImpl) as {
  <T extends PropertyKey, U, R extends PropertyKey>(fn: (key: T, value: U, obj: Record<T, U>) => R, obj: Record<T, U>): Record<R, U>;
  <T extends PropertyKey, U, R extends PropertyKey>(
    fn: (key: T, value: U, obj: Record<T, U>) => R
  ): <T2 extends T, U2 extends U>(obj: Record<T2, U2>) => Record<R, U>;
};
