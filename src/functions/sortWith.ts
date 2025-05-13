import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
import { Comparator } from '../shared/types/Common';

function sortWithImpl<T>(comparator: Comparator<T, T>, array: ArrayContainer<T>): T[] {
  return [...array].sort(comparator);
}

/**
 * Sorts the elements of an array using a custom comparator function
 *
 * @category Array
 * @param comparator - The comparator function to determine sort order
 * @param array - The array to sort
 * @returns Returns a new sorted array
 * @example
 * const array = [3, 1, 4, 1, 5];
 * sortWith((a, b) => b - a, array); // [5, 4, 3, 1, 1]
 * sortWith((a, b) => b - a)(array); // [5, 4, 3, 1, 1]
 */
export const sortWith = curry(sortWithImpl) as {
  <T>(comparator: Comparator<T, T>, array: ArrayContainer<T>): T[];
  <T>(comparator: Comparator<T, T>): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
