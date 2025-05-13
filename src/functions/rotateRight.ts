import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function rotateRightImpl<T>(offset: number, array: ArrayContainer<T>): T[] {
  if (array.length === 0) return [...array];
  const normalizedN = ((offset % array.length) + array.length) % array.length;
  return [...array.slice(-normalizedN), ...array.slice(0, -normalizedN)];
}

/**
 * Rotates the array to the right by n positions
 *
 * @category Array
 * @param n - The number of positions to rotate
 * @param array - The array to rotate
 * @returns Returns a new array rotated to the right by n positions
 * @example
 * const array = [1, 2, 3, 4, 5];
 * rotateRight(2, array); // [4, 5, 1, 2, 3]
 * rotateRight(-2, array); // [3, 4, 5, 1, 2]
 * rotateRight(2)(array); // [4, 5, 1, 2, 3]
 */
export const rotateRight = curry(rotateRightImpl) as {
  <T>(offset: number, array: ArrayContainer<T>): T[];
  <T>(offset: number): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
