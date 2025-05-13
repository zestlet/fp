import { ArrayContainer } from '../shared/types/Array';

function tailImpl<T>(array: ArrayContainer<T>): T[] {
  return array.slice(1);
}

/**
 * Returns all elements of the array except the first one
 *
 * @category Array
 * @param array - The array to get the tail from
 * @returns Returns a new array containing all elements except the first one
 * @example
 * const array = [1, 2, 3, 4, 5];
 * tail(array); // [2, 3, 4, 5]
 * tail([1, 2, 3]); // [2, 3]
 */
export const tail = tailImpl;
