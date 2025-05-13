import { ArrayContainer } from '../shared/types/Array';
import { curry } from './curry';

function removeImpl<T>(index: number, array: ArrayContainer<T>): T[] {
  const normalizedIndex = index < 0 ? array.length + index : index;
  if (normalizedIndex < 0 || normalizedIndex >= array.length) {
    return [...array];
  }
  return [...array.slice(0, normalizedIndex), ...array.slice(normalizedIndex + 1)];
}

/**
 * Removes an element at the specified index from an array
 *
 * @category Array
 * @param index - The index of the element to remove
 * @param array - The array to remove from
 * @returns Returns a new array with the element removed
 * @example
 * const array = [1, 2, 3, 4, 5];
 * remove(2, array); // [1, 2, 4, 5]
 * remove(-1, array); // [1, 2, 3, 4]
 * remove(2)(array); // [1, 2, 4, 5]
 */
export const remove = curry(removeImpl) as {
  <T>(index: number, array: ArrayContainer<T>): T[];
  <T>(index: number): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
