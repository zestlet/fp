import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function sumByImpl<T, U extends number>(fn: (value: T) => U, array: ArrayContainer<T>): number {
  return array.reduce((sum, item) => sum + fn(item), 0);
}

/**
 * Calculates the sum of values in an array by applying a function to each element
 *
 * @category Array
 * @param fn - The function to apply to each element
 * @param array - The array to process
 * @returns Returns the sum of the values returned by the function
 * @example
 * const array = [{ value: 1 }, { value: 2 }, { value: 3 }];
 * sumBy(item => item.value, array); // => 6
 * sumBy(item => item.value * 2)(array); // => 12
 */
export const sumBy = curry(sumByImpl) as {
  <T>(fn: (value: T) => number, array: ArrayContainer<T>): number;
  <T>(fn: (value: T) => number): <T2 extends T>(array: ArrayContainer<T2>) => number;
};
