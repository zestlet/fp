import { ArrayContainer } from '../shared/types/Array';

function lastImpl<T>(array: ArrayContainer<T>): T {
  return array[array.length - 1];
}

/**
 * Returns the last element of an array
 *
 * @category Array
 * @param array - The array to get the last element from
 * @returns Returns the last element of the array, or undefined if the array is empty
 * @example
 * const array = [1, 2, 3, 4, 5];
 * last(array); // 5
 * last([]); // undefined
 * last()(array); // 5
 */
export const last = lastImpl;
