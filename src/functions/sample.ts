import { ArrayContainer } from '../shared/types/Array';

function sampleImpl<T>(array: ArrayContainer<T>): T | undefined {
  if (array.length === 0) return undefined;
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

/**
 * Returns a random element from the array
 *
 * @category Array
 * @param array - The array to sample from
 * @returns Returns a random element from the array, or undefined if the array is empty
 * @example
 * const array = [1, 2, 3, 4, 5];
 * sample(array); // Returns a random element from the array
 * sample([]); // undefined
 */
export const sample = sampleImpl;
