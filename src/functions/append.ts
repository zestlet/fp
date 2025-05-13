import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function appendImpl<T, U>(item: U, array: ArrayContainer<T>): [...T[], U] {
  return [...array, item];
}

/**
 * Appends an item to the end of an array
 *
 * @category Array
 * @param item - The item to append
 * @param array - The array to append to
 * @returns Returns a new array with the item appended
 * @example
 * const array = [1, 2, 3];
 * append(4, array); // [1, 2, 3, 4]
 * append('a')([1, 2, 3]); // [1, 2, 3, 'a']
 */
export const append = curry(appendImpl) as {
  <T, U>(item: U, array: ArrayContainer<T>): [...T[], U];
  <T, U>(item: U): <T2 extends ArrayContainer<T>>(array: T2) => [...T2, U];
};
