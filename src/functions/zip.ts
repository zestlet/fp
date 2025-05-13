import { ArrayContainer } from '../shared/types/Array';
import { curry } from './curry';

function zipImpl<const T, const U>(array2: ArrayContainer<U>, array1: ArrayContainer<T>): [T, U][] {
  const length = Math.min(array1.length, array2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([array1[i], array2[i]]);
  }
  return result;
}

/**
 * Creates an array of paired elements from two arrays
 *
 * @category Array
 * @param array1 - The first array
 * @param array2 - The second array
 * @returns Returns an array of paired elements
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = ['a', 'b', 'c'];
 * zip(array1, array2); // [[1, 'a'], [2, 'b'], [3, 'c']]
 * zip(array1)(array2); // [[1, 'a'], [2, 'b'], [3, 'c']]
 */
export const zip = curry(zipImpl) as {
  <const T, const U>(array1: ArrayContainer<T>, array2: ArrayContainer<U>): [T, U][];
  <const T>(array1: ArrayContainer<T>): <const U>(array2: ArrayContainer<U>) => [T, U][];
};
