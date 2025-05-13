import { ArrayContainer } from '../shared/types/Array';

function maxImpl<T extends number>(array: ArrayContainer<T>): number | undefined {
  if (array.length === 0) return undefined;
  return Math.max(...array);
}

/**
 * Finds the maximum value in an array of numbers
 *
 * @category Array
 * @param array - The array of numbers
 * @returns Returns the maximum value, or undefined if the array is empty
 * @example
 * const array = [1, 2, 3, 4, 5];
 * max(array); // 5
 * max([5, 3, 1, 4, 2]); // 5
 * max()(array); // 5
 */
export const max = maxImpl;
