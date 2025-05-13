import { ArrayContainer } from '../shared/types/Array';

function sortImpl<T>(array: ArrayContainer<T>): T[] {
  return [...array].sort();
}

/**
 * Sorts the elements of an array in ascending order
 *
 * @category Array
 * @param array - The array to sort
 * @returns Returns a new sorted array
 * @example
 * const array = [3, 1, 4, 1, 5];
 * sort(array); // [1, 1, 3, 4, 5]
 * sort(['c', 'a', 'b']); // ['a', 'b', 'c']
 */
export const sort = sortImpl;
