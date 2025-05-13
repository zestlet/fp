import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function unionImpl<T, U>(array2: ArrayContainer<U>, array1: ArrayContainer<T>): (T | U)[] {
  return [...new Set([...array1, ...array2])];
}

/**
 * Returns an array containing unique elements from both arrays
 *
 * @category Array
 * @param array1 - The first array to combine
 * @param array2 - The second array to combine
 * @returns Returns a new array containing unique elements from both arrays
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [2, 4, 6];
 * union(array1, array2); // [1, 2, 3, 4, 5, 6]
 * union(array1)(array2); // [1, 2, 3, 4, 5, 6]
 */
export const union = curry(unionImpl) as {
  <T, U>(array2: ArrayContainer<U>, array1: ArrayContainer<T>): (T | U)[];
  <U>(array2: ArrayContainer<U>): <T>(array1: ArrayContainer<T>) => (T | U)[];
};
