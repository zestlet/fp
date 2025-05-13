import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
function swapImpl<T>(index1: number, index2: number, array: ArrayContainer<T>): T[] {
  if (array.length === 0) return [];

  const normalizedIndex1 = index1 < 0 ? array.length + index1 : index1;
  const normalizedIndex2 = index2 < 0 ? array.length + index2 : index2;

  if (normalizedIndex1 < 0 || normalizedIndex1 >= array.length || normalizedIndex2 < 0 || normalizedIndex2 >= array.length) {
    return [...array];
  }

  const result = [...array];
  [result[normalizedIndex1], result[normalizedIndex2]] = [result[normalizedIndex2], result[normalizedIndex1]];
  return result;
}

/**
 * Swaps two elements in an array at the specified indices
 *
 * @category Array
 * @param index1 - The index of the first element to swap
 * @param index2 - The index of the second element to swap
 * @param array - The array to swap elements in
 * @returns Returns a new array with the elements swapped
 * @example
 * const array = [1, 2, 3, 4, 5];
 * swap(0, 4, array); // => [5, 2, 3, 4, 1]
 * swap(-1, -2, array); // => [1, 2, 3, 5, 4]
 */
export const swap = curry(swapImpl) as {
  <T>(index1: number, index2: number, array: ArrayContainer<T>): T[];
  (index1: number, index2: number): <T>(array: ArrayContainer<T>) => T[];
  (index1: number): {
    <T>(index2: number, array: ArrayContainer<T>): T[];
    (index2: number): <T>(array: ArrayContainer<T>) => T[];
  };
};
