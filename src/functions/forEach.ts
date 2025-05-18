import { curry } from './curry';
import { ArrayContainer, ArrayCallback } from '../shared/types/Array';

function forEachImpl<T>(callbackFn: ArrayCallback<T, unknown>, array: ArrayContainer<T>): ArrayContainer<T> {
  array.forEach(callbackFn);
  return array;
}

/**
 * Executes a function for each element in the array and returns the original array
 *
 * @category Array
 * @param callbackFn - The function to execute for each element
 * @param array - The array to iterate over
 * @returns Returns the original array
 * @example
 * const array = [1, 2, 3];
 * forEach(x => console.log(x), array); // logs: 1, 2, 3
 * // => [1, 2, 3]
 */
export const forEach = curry(forEachImpl) as {
  <T>(callbackFn: ArrayCallback<T, unknown>, array: ArrayContainer<T>): ArrayContainer<T>;
  <T>(callbackFn: ArrayCallback<T, unknown>): (array: ArrayContainer<T>) => ArrayContainer<T>;
};
