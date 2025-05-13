import { ArrayContainer } from '../shared/types/Array';

function meanImpl<T extends number>(array: ArrayContainer<T>): number {
  if (array.length === 0) return NaN;
  return array.reduce((sum, num) => sum + num, 0) / array.length;
}

/**
 * Calculates the mean (average) value of an array of numbers
 *
 * @category Array
 * @param array - The array of numbers
 * @returns Returns the mean value, or NaN if the array is empty
 * @example
 * const array = [1, 2, 3, 4, 5];
 * mean(array); // 3
 * mean([1, 2, 3, 4]); // 2.5
 * mean()(array); // 3
 */
export const mean = meanImpl;
