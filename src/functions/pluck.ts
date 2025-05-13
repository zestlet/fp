import { curry } from './curry';

function pluckImpl<T extends Record<PropertyKey, unknown>, const K extends keyof T>(key: K, array: readonly T[]): T[K][] {
  return array.map(item => item[key]);
}

/**
 * Extracts a list of property values from an array of objects
 *
 * @category Array
 * @param key - The property key to extract
 * @param array - The array of objects
 * @returns Returns an array containing the values of the specified property
 * @example
 * const array = [{name: 'John', age: 30}, {name: 'Jane', age: 25}];
 * pluck('name', array); // ['John', 'Jane']
 * pluck('age', array); // [30, 25]
 * pluck('name')(array); // ['John', 'Jane']
 */
export const pluck = curry(pluckImpl) as {
  <T extends Record<PropertyKey, unknown>, const K extends keyof T>(key: K, array: readonly T[]): T[K][];
  <T extends Record<PropertyKey, unknown>, const K extends keyof T>(key: K): <T2 extends T>(array: readonly T2[]) => T2[K][];
};
