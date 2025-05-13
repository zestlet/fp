import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function lastIndexOfImpl<T>(item: unknown, array: ArrayContainer<T>): number {
  return array.lastIndexOf(item as T);
}

/**
 * Returns the index of the last occurrence of an item in an array
 *
 * @category Array
 * @param item - The item to search for
 * @param array - The array to search in
 * @returns Returns the index of the last occurrence of the item, or -1 if not found
 * @example
 * const array = [1, 2, 3, 4, 5, 3];
 * lastIndexOf(3, array); // 5
 * lastIndexOf(6, array); // -1
 * lastIndexOf(3)(array); // 5
 */
export const lastIndexOf = curry(lastIndexOfImpl) as {
  <T>(item: unknown, array: ArrayContainer<T>): number;
  (item: unknown): <T>(array: ArrayContainer<T>) => number;
};
