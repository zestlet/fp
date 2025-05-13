import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function moveImpl<T>(fromIndex: number, toIndex: number, array: ArrayContainer<T>): T[] {
  if (array.length === 0) return [];

  const normalizedFromIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;
  const normalizedToIndex = toIndex < 0 ? array.length + toIndex : toIndex;

  if (normalizedFromIndex < 0 || normalizedFromIndex >= array.length || normalizedToIndex < 0 || normalizedToIndex >= array.length) {
    return [...array];
  }

  const item = array[normalizedFromIndex];
  const result = [...array];
  result.splice(normalizedFromIndex, 1);
  result.splice(normalizedToIndex, 0, item);
  return result;
}

/**
 * Moves an element in an array from one index to another
 *
 * @category Array
 * @param fromIndex - The index of the element to move
 * @param toIndex - The index to move the element to
 * @param array - The array to move the element in
 * @returns Returns a new array with the element moved
 * @example
 * const array = [1, 2, 3, 4, 5];
 * move(0, 4, array); // => [2, 3, 4, 5, 1]
 * move(-1, 0, array); // => [5, 1, 2, 3, 4]
 */
export const move = curry(moveImpl) as {
  <T>(fromIndex: number, toIndex: number, array: ArrayContainer<T>): T[];
  (fromIndex: number, toIndex: number): <T>(array: ArrayContainer<T>) => T[];
  (fromIndex: number): {
    <T>(toIndex: number, array: ArrayContainer<T>): T[];
    (toIndex: number): <T>(array: ArrayContainer<T>) => T[];
  };
};
