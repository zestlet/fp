import { ArrayContainer } from '../shared/types/Array';

function sumImpl<T extends number>(array: ArrayContainer<T>): number {
  return array.reduce((sum, num) => sum + num, 0);
}

/**
 * Calculates the sum of all numbers in an array
 *
 * @category Array
 * @param array - The array of numbers
 * @returns Returns the sum of all numbers, or 0 if the array is empty
 * @example
 * const array = [1, 2, 3, 4, 5];
 * sum(array); // => 15
 * sum([1, 2, 3, 4]); // => 10
 */
export const sum = sumImpl;
