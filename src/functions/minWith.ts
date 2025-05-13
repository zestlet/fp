import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
import { Comparator } from '../shared/types/Common';

function minWithImpl<T>(comparator: Comparator<T, T>, array: ArrayContainer<T>): T | undefined {
  if (array.length === 0) return undefined;
  return array.reduce((min, current) => (comparator(current, min) < 0 ? current : min));
}

/**
 * Finds the minimum value in an array using a custom comparator function
 *
 * @category Array
 * @param comparator - The comparison function that returns a negative number if a < b, 0 if a === b, or a positive number if a > b
 * @param array - The array to process
 * @returns Returns the element with the minimum value, or undefined if the array is empty
 * @example
 * const array = [{ value: 1 }, { value: 2 }, { value: 3 }];
 * minWith((a, b) => a.value - b.value, array); // => { value: 1 }
 * minWith((a, b) => b.value - a.value)(array); // => { value: 3 }
 */
export const minWith = curry(minWithImpl) as {
  <T>(comparator: Comparator<T, T>, array: ArrayContainer<T>): T | undefined;
  <T>(comparator: Comparator<T, T>): <T2 extends T>(array: ArrayContainer<T2>) => T2 | undefined;
};
