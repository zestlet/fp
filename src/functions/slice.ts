import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function sliceImpl<T>(start: number, end: number | undefined, array: ArrayContainer<T>): T[] {
  return array.slice(start, end);
}

/**
 * Returns a slice of an array from start to end (exclusive)
 *
 * @category Array
 * @param start - The start index
 * @param end - The end index (exclusive)
 * @param array - The array to slice
 * @returns Returns a new array containing the sliced elements
 * @example
 * const array = [1, 2, 3, 4, 5];
 * slice(1, 3, array); // [2, 3]
 * slice(1)(3, array); // [2, 3]
 * slice(1, 3)(array); // [2, 3]
 */
export const slice = curry(sliceImpl) as {
  <T>(start: number, end: number | undefined, array: ArrayContainer<T>): T[];
  <T>(start: number, end: number | undefined): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
  <T>(start: number): {
    <T2 extends T>(end: number | undefined, array: ArrayContainer<T2>): T2[];
    (end: number | undefined): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
  };
};
