import { curry } from './curry';

/**
 * Creates a new object with only the properties that satisfy the predicate function.
 * The predicate function receives the value and key of each property.
 *
 * @category Object
 * @param predicate The function to test each property
 * @param obj The object to pick properties from
 * @returns A new object with only the properties that satisfy the predicate
 * @example
 * pickBy(x => x > 1, { a: 1, b: 2, c: 3 }) // { b: 2, c: 3 }
 * pickBy((_, key) => key.startsWith('_'), { _a: 1, b: 2, _c: 3 }) // { _a: 1, _c: 3 }
 */
function pickByImpl<T extends Record<PropertyKey, unknown>>(predicate: (value: T[keyof T], key: keyof T) => boolean, obj: T): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (predicate(value, key as keyof T)) {
        result[key] = value;
      }
    }
  }
  return result;
}

export const pickBy = curry(pickByImpl) as {
  <T extends Record<PropertyKey, unknown>>(predicate: (value: T[keyof T], key: keyof T) => boolean, obj: T): Partial<T>;
  <T extends Record<PropertyKey, unknown>>(predicate: (value: T[keyof T], key: keyof T) => boolean): <T2 extends T>(obj: T2) => Partial<T2>;
};
