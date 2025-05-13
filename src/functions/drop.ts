import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function dropImpl<T>(count: number, array: ArrayContainer<T>): T[] {
  return count < 0 ? [...array] : array.slice(count);
}

/**
 * Drops the first n elements from an array
 *
 * @category Array
 * @param count - The number of elements to drop from the beginning
 * @param array - The input array
 * @returns A new array with the first n elements dropped
 * @example
 * const array = [1, 2, 3, 4, 5];
 * drop(2, array); // [3, 4, 5]
 * drop(0, array); // [1, 2, 3, 4, 5]
 * drop(2)(array); // [3, 4, 5]
 */
export const drop = curry(dropImpl) as {
  <T>(count: number, array: ArrayContainer<T>): T[];
  (count: number): <T>(array: ArrayContainer<T>) => T[];
};
