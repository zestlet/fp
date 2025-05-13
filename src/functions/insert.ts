import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function insertImpl<T, U>(index: number, item: U, array: ArrayContainer<T>): (T | U)[] {
  const normalizedIndex = index < 0 ? Math.max(array.length + index, 0) : Math.min(index, array.length);
  return [...array.slice(0, normalizedIndex), item, ...array.slice(normalizedIndex)];
}

/**
 * Inserts an item into an array at the specified index
 *
 * @category Array
 * @param index - The index at which to insert the item
 * @param item - The item to insert
 * @param array - The array to insert into
 * @returns Returns a new array with the item inserted at the specified index
 * @example
 * const array = [1, 2, 3, 4];
 * insert(1, 5, array); // [1, 5, 2, 3, 4]
 * insert(-1, 5, array); // [1, 2, 3, 5, 4]
 * insert(1)(5)(array); // [1, 5, 2, 3, 4]
 */
export const insert = curry(insertImpl) as {
  <T, U>(index: number, item: U, array: ArrayContainer<T>): (T | U)[];
  <T, U>(index: number, item: U): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | U)[];
  <T>(index: number): {
    <T2 extends T, U>(item: U, array: ArrayContainer<T2>): (T2 | U)[];
    <U>(item: U): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | U)[];
  };
};
