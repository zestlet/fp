import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function bifurcateImpl<T, F extends ArrayContainer<boolean>>(filter: F, array: ArrayContainer<T>): [T[], T[]] {
  if (array.length === 0) return [[], []];

  const minLength = Math.min(filter.length, array.length);
  const result: [T[], T[]] = [[], []];

  for (let i = 0; i < minLength; i++) {
    result[filter[i] ? 0 : 1].push(array[i]);
  }

  return result;
}

/**
 * Splits an array into two arrays based on a boolean filter array
 *
 * @category Array
 * @param filter - The boolean filter array
 * @param array - The input array
 * @returns Returns a tuple of two arrays, where the first array contains elements where filter is true, and the second array contains elements where filter is false
 * @example
 * const array = [1, 2, 3, 4];
 * const filter = [true, false, true, false];
 * bifurcate(filter, array); // [[1, 3], [2, 4]]
 */
export const bifurcate = curry(bifurcateImpl) as {
  <T, F extends ArrayContainer<boolean>>(filter: F, array: ArrayContainer<T>): [T[], T[]];
  <T, F extends ArrayContainer<boolean>>(filter: F): <T2 extends T>(array: ArrayContainer<T2>) => [T2[], T2[]];
};
