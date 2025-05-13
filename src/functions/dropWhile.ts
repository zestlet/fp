import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function dropWhileImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[] {
  let index = 0;
  while (index < array.length && predicate(array[index], index, array)) {
    index++;
  }
  return array.slice(index);
}

/**
 * Drops elements from the beginning of an array while the predicate function returns true
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to process
 * @returns Returns a new array with elements dropped from the beginning while predicate returns true
 * @example
 * const array = [1, 2, 3, 4, 5];
 * dropWhile(x => x < 3, array); // [3, 4, 5]
 * dropWhile(x => x > 0, array); // []
 * dropWhile(x => x < 3)(array); // [3, 4, 5]
 */
export const dropWhile = curry(dropWhileImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[];
  <T>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
