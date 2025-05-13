import { ArrayContainer } from '../shared/types/Array';

function uniqueImpl<T>(array: ArrayContainer<T>): T[] {
  return [...new Set(array)];
}

/**
 * Returns an array of unique elements from the input array
 *
 * @category Array
 * @param array - The array to get unique elements from
 * @returns Returns a new array containing only unique elements
 * @example
 * const array = [1, 2, 2, 3, 3, 4];
 * unique(array); // [1, 2, 3, 4]
 * unique([1, 1, 2, 2]); // [1, 2]
 */
export const unique = uniqueImpl;
