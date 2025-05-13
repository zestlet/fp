import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function splitAtImpl<T>(index: number, array: ArrayContainer<T>): [T[], T[]] {
  if (index < 0) return [[], [...array]];
  return [array.slice(0, index), array.slice(index)];
}

/**
 * Splits an array into two parts at the specified index
 *
 * @category Array
 * @param index - The index at which to split the array
 * @param array - The array to split
 * @returns Returns a tuple of two arrays, split at the given index
 * @example
 * const array = [1, 2, 3, 4, 5];
 * splitAt(2, array); // [[1, 2], [3, 4, 5]]
 * splitAt(2)(array); // [[1, 2], [3, 4, 5]]
 */
export const splitAt = curry(splitAtImpl) as {
  <T>(index: number, array: ArrayContainer<T>): [T[], T[]];
  <T>(index: number): <T2 extends T>(array: ArrayContainer<T2>) => [T2[], T2[]];
};
