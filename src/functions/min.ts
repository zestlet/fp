import { ArrayContainer } from '../shared/types/Array';

function minImpl<T extends number>(array: ArrayContainer<T>): number | undefined {
  if (array.length === 0) return undefined;
  return Math.min(...array);
}

/**
 * Finds the minimum value in an array of numbers
 *
 * @category Array
 * @param array - The array of numbers
 * @returns Returns the minimum value, or undefined if the array is empty
 * @example
 * const array = [1, 2, 3, 4, 5];
 * min(array); // 1
 * min([5, 3, 1, 4, 2]); // 1
 * min()(array); // 1
 */
export const min = minImpl;
