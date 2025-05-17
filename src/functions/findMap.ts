import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function findMapImpl<T, R, D>(defaultValue: D, fn: ArrayCallback<T, R>, array: ArrayContainer<T>): R | D {
  for (let i = 0; i < array.length; i++) {
    const result = fn(array[i], i, array);
    if (result !== undefined) {
      return result;
    }
  }
  return defaultValue;
}

/**
 * Finds the first element that satisfies the predicate and transforms it using the same function
 *
 * @category Array
 * @param fn - The function that both tests and transforms elements. Returns undefined for elements that should be skipped
 * @param array - The array to search
 * @returns Returns the first non-undefined result from the function, or undefined if no element satisfies the condition
 * @example
 * const array = [1, 2, 3, 4, 5];
 * findMap(x => x % 2 === 0 ? x * 2 : undefined, array); // 4
 * findMap(x => x > 3 ? x.toString() : undefined)(array); // "4"
 */
export const findMap = curry(findMapImpl) as {
  <T, R, D>(defaultValue: D, fn: ArrayCallback<T, R>, array: ArrayContainer<T>): R | D;
  <T, R, D>(defaultValue: D, fn: ArrayCallback<T, R>): (array: ArrayContainer<T>) => R | D;
  <D>(defaultValue: D): {
    <T, R>(fn: ArrayCallback<T, R>, array: ArrayContainer<T>): R | D;
    <T, R>(fn: ArrayCallback<T, R>): (array: ArrayContainer<T>) => R | D;
  };
};
