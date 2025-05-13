import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function differenceImpl<T, U>(arrayB: ArrayContainer<U>, arrayA: ArrayContainer<T>): T[] {
  return arrayA.filter(item => !arrayB.includes(item as unknown as U));
}

/**
 * Returns an array containing elements that exist in the first array but not in the second array
 *
 * @category Array
 * @param array1 - The first array to compare
 * @param array2 - The second array to compare against
 * @returns Returns a new array containing elements unique to the first array
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [2, 4, 6];
 * difference(array1, array2); // [1, 3, 5]
 * difference(array1)(array2); // [1, 3, 5]
 */
export const difference = curry(differenceImpl) as {
  <T, U>(arrayB: ArrayContainer<U>, arrayA: ArrayContainer<T>): T[];
  <U>(arrayB: ArrayContainer<U>): <T>(arrayA: ArrayContainer<T>) => T[];
};
