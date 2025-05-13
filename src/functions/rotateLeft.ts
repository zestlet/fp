import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function rotateLeftImpl<T>(offset: number, array: ArrayContainer<T>): T[] {
  if (array.length === 0) return [...array];
  const normalizedN = ((offset % array.length) + array.length) % array.length;
  return [...array.slice(normalizedN), ...array.slice(0, normalizedN)];
}

/**
 * Rotates the array to the left by n positions
 *
 * @category Array
 * @param n - The number of positions to rotate
 * @param array - The array to rotate
 * @returns Returns a new array rotated to the left by n positions
 * @example
 * const array = [1, 2, 3, 4, 5];
 * rotateLeft(2, array); // [3, 4, 5, 1, 2]
 * rotateLeft(-2, array); // [4, 5, 1, 2, 3]
 * rotateLeft(2)(array); // [3, 4, 5, 1, 2]
 */
export const rotateLeft = curry(rotateLeftImpl) as {
  <T>(offset: number, array: ArrayContainer<T>): T[];
  <T>(offset: number): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
