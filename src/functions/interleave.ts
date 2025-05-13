import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function interleaveImpl<T, U>(array2: ArrayContainer<U>, array1: ArrayContainer<T>): (T | U)[] {
  const result: (T | U)[] = [];
  const maxLength = Math.max(array1.length, array2.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < array1.length) result.push(array1[i]);
    if (i < array2.length) result.push(array2[i]);
  }

  return result;
}

/**
 * Interleaves elements from two arrays
 *
 * @category Array
 * @param array1 - The first array
 * @param array2 - The second array
 * @returns Returns a new array with elements from both arrays interleaved
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = ['a', 'b', 'c'];
 * interleave(array1, array2); // [1, 'a', 2, 'b', 3, 'c']
 * interleave(array1)(array2); // [1, 'a', 2, 'b', 3, 'c']
 */
export const interleave = curry(interleaveImpl) as {
  <T, U>(array2: ArrayContainer<T>, array1: ArrayContainer<U>): (T | U)[];
  <U>(array2: ArrayContainer<U>): <T>(array1: ArrayContainer<T>) => (T | U)[];
};
