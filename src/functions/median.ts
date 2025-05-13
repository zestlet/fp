import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function medianImpl<T extends number>(array: ArrayContainer<T>): number {
  if (array.length === 0) return NaN;

  const sorted = [...array].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }

  return sorted[middle];
}

/**
 * Calculates the median value of an array of numbers
 *
 * @category Array
 * @param array - The array of numbers
 * @returns Returns the median value, or NaN if the array is empty
 * @example
 * const array = [1, 2, 3, 4, 5];
 * median(array); // 3
 * median([1, 2, 3, 4]); // 2.5
 * median()(array); // 3
 */
export const median = medianImpl;
