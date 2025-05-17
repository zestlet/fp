import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function unzipWithImpl<T, R>(fn: (tuple: T[]) => R, array: ArrayContainer<T[]>): R[] {
  if (array.length === 0) return [];

  const maxLength = Math.max(...array.map(tuple => tuple.length));
  const result: R[] = [];

  for (let i = 0; i < maxLength; i++) {
    const tuple = array.map(tuple => tuple[i]);
    result.push(fn(tuple));
  }

  return result;
}

/**
 * Transforms a list of tuples into a list of values by applying a function to each tuple
 *
 * @category Array
 * @param fn - The function to transform each tuple
 * @param array - The array of tuples to transform
 * @returns Returns a new array with the results of applying the function to each tuple
 * @example
 * const array = [[1, 2], [3, 4], [5, 6]];
 * unzipWith(([a, b]) => a + b, array); // [9, 12]
 * unzipWith(([a, b]) => a * b)(array); // [2, 12, 30]
 */
export const unzipWith = curry(unzipWithImpl) as {
  <T, R>(fn: (tuple: T[]) => R, array: ArrayContainer<T[]>): R[];
  <T, R>(fn: (tuple: T[]) => R): (array: ArrayContainer<T[]>) => R[];
};
