import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function sampleSizeImpl<T>(size: number, array: ArrayContainer<T>): T[] {
  if (array.length === 0 || size <= 0) return [];

  const actualSize = Math.min(size, array.length);
  const indices = new Array(array.length).fill(0).map((_, i) => i);

  for (let i = 0; i < actualSize; i++) {
    const randomIndex = i + Math.floor(Math.random() * (indices.length - i));
    [indices[i], indices[randomIndex]] = [indices[randomIndex], indices[i]];
  }

  return indices.slice(0, actualSize).map(index => array[index]);
}

/**
 * Returns n random elements from the array
 *
 * @category Array
 * @param size - The number of elements to sample
 * @param array - The array to sample from
 * @returns Returns an array of n random elements from the array
 * @example
 * const array = [1, 2, 3, 4, 5];
 * sampleSize(2, array); // Returns an array of 2 random elements
 * sampleSize(10, array); // Returns a shuffled copy of the array
 * sampleSize(2)(array); // Returns an array of 2 random elements
 */
export const sampleSize = curry(sampleSizeImpl) as {
  <T>(size: number, array: ArrayContainer<T>): T[];
  (size: number): <T>(array: ArrayContainer<T>) => T[];
};
