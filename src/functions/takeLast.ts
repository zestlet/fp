import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function takeLastImpl<T>(count: number, array: ArrayContainer<T>): T[] {
  return count <= 0 ? [] : array.slice(-count);
}

/**
 * Takes the last n elements from an array
 *
 * @category Array
 * @param count - The number of elements to take from the end
 * @param array - The array to take elements from
 * @returns Returns a new array with the last n elements
 * @example
 * const array = [1, 2, 3, 4, 5];
 * takeLast(3, array); // => [3, 4, 5]
 * takeLast(3)([1, 2, 3, 4]); // => [2, 3, 4]
 */
export const takeLast = curry(takeLastImpl) as {
  <T>(count: number, array: ArrayContainer<T>): T[];
  (count: number): <T>(array: ArrayContainer<T>) => T[];
};
