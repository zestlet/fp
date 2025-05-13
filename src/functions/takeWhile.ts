import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function takeWhileImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (!predicate(array[i], i, array)) break;
    result.push(array[i]);
  }
  return result;
}

/**
 * Takes elements from an array while the predicate returns true
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to take elements from
 * @returns Returns a new array with the elements taken from the start
 * @example
 * const array = [1, 2, 3, 4, 5];
 * takeWhile(x => x < 4, array); // => [1, 2, 3]
 * takeWhile(x => x < 4)(array); // => [1, 2, 3]
 */
export const takeWhile = curry(takeWhileImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[];
  <T>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
