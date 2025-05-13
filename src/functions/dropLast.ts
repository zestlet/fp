import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function dropLastImpl<T>(count: number, array: ArrayContainer<T>): T[] {
  return count <= 0 ? [...array] : array.slice(0, -count);
}

/**
 * Drops the specified number of elements from the end of an array
 *
 * @category Array
 * @param count - The number of elements to drop from the end
 * @param array - The input array
 * @returns A new array with the specified number of elements dropped from the end
 * @example
 * const array = [1, 2, 3, 4, 5];
 * dropLast(2, array); // [1, 2, 3]
 * dropLast(0, array); // [1, 2, 3, 4, 5]
 * dropLast(2)(array); // [1, 2, 3]
 */
export const dropLast = curry(dropLastImpl) as {
  <T>(count: number, array: ArrayContainer<T>): T[];
  (count: number): <T>(array: ArrayContainer<T>) => T[];
};
