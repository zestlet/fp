/**
 * Inverts the keys and values of an object. If a value is duplicated, the last key overwrites previous ones.
 * Only handles string and number keys/values.
 *
 * @category Object
 * @param obj The object to invert
 * @returns A new object with keys and values swapped
 * @example
 * invert({ a: 1, b: 2, c: 1 }) // { '1': 'c', '2': 'b' }
 */
function invertImpl<T extends PropertyKey, U extends PropertyKey>(obj: Record<T, U>): Record<U, T> {
  const result = {} as Record<U, T>;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      result[value] = key;
    }
  }
  return result;
}

export const invert = invertImpl;
