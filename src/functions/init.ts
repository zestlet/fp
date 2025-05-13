import { ArrayContainer } from '../shared/types/Array';

function initImpl<T>(array: ArrayContainer<T>): T[] {
  return array.slice(0, -1);
}

/**
 * Returns all but the last element of an array
 *
 * @category Array
 * @param array - The array to get all but the last element from
 * @returns Returns a new array containing all but the last element
 * @example
 * const array = [1, 2, 3, 4, 5];
 * init(array); // [1, 2, 3, 4]
 * init([]); // []
 * init()(array); // [1, 2, 3, 4]
 */
export const init = initImpl;
