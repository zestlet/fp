import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function concatImpl<T, U>(arrayB: ArrayContainer<U>, arrayA: ArrayContainer<T>): (T | U)[] {
  return [...arrayA, ...arrayB];
}

/**
 * Concatenates two arrays
 *
 * @category Array
 * @param arrayB - The second array to concatenate
 * @param arrayA - The first array to concatenate
 * @returns Returns a new array containing elements from both arrays
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = [4, 5, 6];
 * concat(array2, array1); // [1, 2, 3, 4, 5, 6]
 * concat(array2)(array1); // [1, 2, 3, 4, 5, 6]
 */
export const concat = curry(concatImpl) as {
  <T, U>(arrayB: ArrayContainer<U>, arrayA: ArrayContainer<T>): (T | U)[];
  <U>(arrayB: ArrayContainer<U>): <T>(arrayA: ArrayContainer<T>) => (T | U)[];
};
