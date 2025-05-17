import { curry } from './curry';

function partitionWithImpl<T extends Record<string, any>>(
  predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean,
  obj: T
): [Partial<T>, Partial<T>] {
  const result: [Partial<T>, Partial<T>] = [{}, {}];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const target = predicate(value, key, obj) ? result[0] : result[1];
      target[key] = value;
    }
  }
  return result;
}

/**
 * Partitions an object into two objects based on a predicate function
 *
 * @category Object
 * @param predicate - The predicate function to test each property value and key
 * @param obj - The object to partition
 * @returns Returns a tuple containing two objects: [trueValues, falseValues]
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * partitionWith((value) => value > 2, obj); // [{ c: 3 }, { a: 1, b: 2 }]
 *
 * const user = { name: 'Alice', age: 20, active: true };
 * partitionWith((value, key) => typeof value === 'string', user);
 * // [{ name: 'Alice' }, { age: 20, active: true }]
 */
export const partitionWith = curry(partitionWithImpl) as {
  <T extends Record<string, any>>(predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean, obj: T): [Partial<T>, Partial<T>];
  <T extends Record<string, any>>(predicate: (value: T[keyof T], key: keyof T, obj: T) => boolean): (obj: T) => [Partial<T>, Partial<T>];
};
