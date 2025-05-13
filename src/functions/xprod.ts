import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function xprodImpl<T, U>(array2: ArrayContainer<U>, array1: ArrayContainer<T>): [T, U][] {
  const result: [T, U][] = [];
  for (const item1 of array1) {
    for (const item2 of array2) {
      result.push([item1, item2]);
    }
  }
  return result;
}

/**
 * Creates the cartesian product of two arrays
 *
 * @category Array
 * @param array1 - The first array
 * @param array2 - The second array
 * @returns Returns an array of pairs containing all possible combinations of elements from both arrays
 * @example
 * const array1 = [1, 2];
 * const array2 = ['a', 'b'];
 * xprod(array1, array2); // => [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
 */
export const xprod = curry(xprodImpl) as {
  <T, U>(array1: ArrayContainer<T>, array2: ArrayContainer<U>): [T, U][];
  <T>(array1: ArrayContainer<T>): <U>(array2: ArrayContainer<U>) => [T, U][];
};
