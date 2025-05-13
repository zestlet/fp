import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function chunkImpl<T>(size: number, array: ArrayContainer<T>): T[][] {
  if (size <= 0) return [];
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Splits an array into chunks of the specified size
 *
 * @category Array
 * @param size - The size of each chunk
 * @param array - The array to split into chunks
 * @returns Returns an array of chunks
 * @example
 * const array = [1, 2, 3, 4, 5];
 * chunk(2, array); // [[1, 2], [3, 4], [5]]
 * chunk(3, array); // [[1, 2, 3], [4, 5]]
 * chunk(2)(array); // [[1, 2], [3, 4], [5]]
 */
export const chunk = curry(chunkImpl) as {
  <T>(size: number, array: ArrayContainer<T>): T[][];
  <T>(size: number): <T2 extends T>(array: ArrayContainer<T2>) => T2[][];
};
