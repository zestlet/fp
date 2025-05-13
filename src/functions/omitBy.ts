import { curry } from './curry';

/**
 * Creates a new object with all properties that do not satisfy the predicate function.
 * The predicate function receives the value and key of each property.
 *
 * @category Object
 * @param predicate The function to test each property
 * @param obj The object to omit properties from
 * @returns A new object with properties that do not satisfy the predicate
 * @example
 * omitBy(x => x > 1, { a: 1, b: 2, c: 3 }) // { a: 1 }
 * omitBy((_, key) => key.startsWith('_'), { _a: 1, b: 2, _c: 3 }) // { b: 2 }
 */
function omitByImpl<T extends Record<PropertyKey, unknown>>(
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean,
  obj: T
): Partial<T> {
  const result: Partial<T> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (!predicate(value, key as keyof T, obj)) {
        result[key] = value;
      }
    }
  }
  return result;
}

export const omitBy = curry(omitByImpl) as {
  <T extends Record<PropertyKey, unknown>>(predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, obj: T): Partial<T>;
  <T extends Record<PropertyKey, unknown>>(
    predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean
  ): <T2 extends T>(obj: T2) => Partial<T2>;
};
