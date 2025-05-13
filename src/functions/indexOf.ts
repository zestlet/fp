import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function indexOfImpl<T>(item: unknown, array: ArrayContainer<T>): number {
  return array.indexOf(item as unknown as T);
}

/**
 * Returns the index of the first occurrence of an item in an array
 *
 * @category Array
 * @param item - The item to search for
 * @param array - The array to search in
 * @returns Returns the index of the first occurrence of the item, or -1 if not found
 * @example
 * const array = [1, 2, 3, 4, 5, 3];
 * indexOf(3, array); // 2
 * indexOf(6, array); // -1
 * indexOf(3)(array); // 2
 */
export const indexOf = curry(indexOfImpl) as {
  <T>(item: unknown, array: ArrayContainer<T>): number;
  (item: unknown): <T>(array: ArrayContainer<T>) => number;
};
