import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function includesImpl<T, U>(item: U, array: ArrayContainer<T>): boolean {
  return array.includes(item as unknown as T);
}

/**
 * Checks if an array includes a specific element
 *
 * @category Array
 * @param item - The item to search for
 * @param array - The array to search in
 * @returns Returns true if the item is found in the array, false otherwise
 * @example
 * const array = [1, 2, 3, 4, 5];
 * includes(3, array); // true
 * includes(6, array); // false
 * includes(3)(array); // true
 */
export const includes = curry(includesImpl) as {
  <T, U>(item: U, array: ArrayContainer<T>): boolean;
  <T, U>(item: U): <T2 extends T>(array: ArrayContainer<T2>) => boolean;
};
