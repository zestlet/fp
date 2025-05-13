import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function takeLastWhileImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[] {
  const result: T[] = [];
  for (let i = array.length - 1; i >= 0; i--) {
    if (!predicate(array[i], i, array)) break;
    result.unshift(array[i]);
  }
  return result;
}

/**
 * Takes elements from the end of an array while the predicate returns true
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to take elements from
 * @returns Returns a new array with the elements taken from the end
 * @example
 * const array = [1, 2, 3, 4, 5];
 * takeLastWhile(x => x > 3, array); // => [4, 5]
 * takeLastWhile(x => x > 3)(array); // => [4, 5]
 */
export const takeLastWhile = curry(takeLastWhileImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[];
  <T>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
