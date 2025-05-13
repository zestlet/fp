import { ArrayContainer } from '../shared/types/Array';

function firstImpl<T>(array: ArrayContainer<T>): T | undefined {
  return array[0];
}

/**
 * Returns the first element of an array
 *
 * @category Array
 * @param array - The array to get the first element from
 * @returns Returns the first element of the array, or undefined if the array is empty
 * @example
 * const array = [1, 2, 3, 4, 5];
 * first(array); // 1
 * first([]); // undefined
 * first()(array); // 1
 */
export const first = firstImpl;
