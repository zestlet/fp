import { ArrayContainer } from '../shared/types/Array';

function reverseImpl<T>(array: ArrayContainer<T>): T[] {
  return [...array].reverse();
}

/**
 * Reverses the elements of an array
 *
 * @category Array
 * @param array - The array to reverse
 * @returns Returns a new array with elements in reverse order
 * @example
 * const array = [1, 2, 3, 4, 5];
 * reverse(array); // [5, 4, 3, 2, 1]
 * reverse(['a', 'b', 'c']); // ['c', 'b', 'a']
 */
export const reverse = reverseImpl;
