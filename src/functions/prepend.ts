import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function prependImpl<T, U>(item: U, array: ArrayContainer<T>): (T | U)[] {
  return [item, ...array];
}

/**
 * Adds an item to the beginning of an array
 *
 * @category Array
 * @param item - The item to add
 * @param array - The array to prepend to
 * @returns Returns a new array with the item added at the beginning
 * @example
 * const array = [1, 2, 3];
 * prepend(0, array); // [0, 1, 2, 3]
 * prepend('a')([1, 2, 3]); // ['a', 1, 2, 3]
 */
export const prepend = curry(prependImpl) as {
  <T, U>(item: U, array: ArrayContainer<T>): (T | U)[];
  <T, U>(item: U): <T2 extends T>(array: ArrayContainer<T2>) => (T | U)[];
};
