import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function maxByImpl<T, U>(fn: (value: T) => U, array: ArrayContainer<T>): T | undefined {
  if (array.length === 0) return undefined;
  return array.reduce((max, current) => (fn(current) > fn(max) ? current : max));
}

/**
 * Finds the maximum value in an array by applying a function to each element
 *
 * @category Array
 * @param fn - The function to apply to each element
 * @param array - The array to process
 * @returns Returns the element with the maximum value, or undefined if the array is empty
 * @example
 * const array = [{ value: 1 }, { value: 2 }, { value: 3 }];
 * maxBy(item => item.value, array); // => { value: 3 }
 * maxBy(item => item.value * 2)(array); // => { value: 3 }
 */
export const maxBy = curry(maxByImpl) as {
  <T, U>(fn: (value: T) => U, array: ArrayContainer<T>): T | undefined;
  <T, U>(fn: (value: T) => U): <T2 extends T>(array: ArrayContainer<T2>) => T2 | undefined;
};
