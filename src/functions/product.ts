import { ArrayContainer } from '../shared/types/Array';

function productImpl<T extends number>(array: ArrayContainer<T>): number {
  if (array.length === 0) return NaN;
  return array.reduce((prod, num) => prod * num, 1);
}

/**
 * Calculates the product of all numbers in an array
 *
 * @category Array
 * @param array - The array of numbers
 * @returns Returns the product of all numbers, or 1 if the array is empty
 * @example
 * const array = [1, 2, 3, 4, 5];
 * product(array); // => 120
 * product([1, 2, 3, 4]); // => 24
 */
export const product = productImpl;
