import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function symmetricDifferenceImpl<T>(array2: ArrayContainer<T>, array1: ArrayContainer<T>): T[] {
  return [...new Set([...array1.filter(item => !array2.includes(item)), ...array2.filter(item => !array1.includes(item))])];
}

/**
 * Returns an array containing elements that exist in either array but not in both arrays
 *
 * @category Array
 * @param array1 - The first array to compare
 * @param array2 - The second array to compare against
 * @returns Returns a new array containing elements unique to either array
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [2, 4, 6];
 * symmetricDifference(array1, array2); // [1, 3, 5, 6]
 * symmetricDifference(array1)(array2); // [1, 3, 5, 6]
 */
export const symmetricDifference = curry(symmetricDifferenceImpl) as {
  <T>(array2: ArrayContainer<T>, array1: ArrayContainer<T>): T[];
  <T>(array2: ArrayContainer<T>): <T2 extends T>(array1: ArrayContainer<T2>) => T[];
};
