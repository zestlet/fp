import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function takeImpl<T>(count: number, array: ArrayContainer<T>): T[] {
  return count < 0 ? [] : array.slice(0, count);
}

/**
 * Takes the first n elements from an array
 *
 * @category Array
 * @param count - The number of elements to take
 * @param array - The array to take elements from
 * @returns Returns a new array with the first n elements
 * @example
 * const array = [1, 2, 3, 4, 5];
 * take(3, array); // => [1, 2, 3]
 * take(3)([1, 2, 3, 4]); // => [1, 2, 3]
 */
export const take = curry(takeImpl) as {
  <T>(count: number, array: ArrayContainer<T>): T[];
  (count: number): <T>(array: ArrayContainer<T>) => T[];
};
