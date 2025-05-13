import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function apertureImpl<T>(size: number, array: ArrayContainer<T>): T[][] {
  if (size <= 0 || size > array.length) return [];
  const result: T[][] = [];
  for (let i = 0; i <= array.length - size; i++) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Creates a new list of n-tuples (sliding windows) from the given array
 *
 * @category Array
 * @param size - The size of each sliding window
 * @param array - The array to create sliding windows from
 * @returns Returns an array of sliding windows
 * @example
 * const array = [1, 2, 3, 4, 5];
 * aperture(3, array); // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 * aperture(2, array); // [[1, 2], [2, 3], [3, 4], [4, 5]]
 * aperture(3)(array); // [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
 */
export const aperture = curry(apertureImpl) as {
  <T>(size: number, array: T): T[][];
  (size: number): {
    <T>(array: T): T[][];
  };
};
