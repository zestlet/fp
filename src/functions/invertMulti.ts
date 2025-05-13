import { curry } from './curry';

/**
 * Inverts the keys and values of an object. If a value is duplicated, all keys are collected into an array.
 * Only handles string and number keys/values.
 *
 * @category Object
 * @param obj The object to invert
 * @returns A new object with keys and values swapped, values are arrays of keys if duplicated
 * @example
 * invertMulti({ a: 1, b: 2, c: 1 }) // { '1': ['a', 'c'], '2': ['b'] }
 */
function invertMultiImpl<T extends PropertyKey, U extends PropertyKey>(obj: Record<T, U>): Record<U, T[]> {
  const result = {} as Record<U, T[]>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      if (!result[value]) {
        result[value] = [key];
      } else {
        result[value].push(key);
      }
    }
  }
  return result;
}

export const invertMulti = curry(invertMultiImpl) as {
  <T extends Record<PropertyKey, PropertyKey>>(obj: T): Record<string, Array<keyof T>>;
};
