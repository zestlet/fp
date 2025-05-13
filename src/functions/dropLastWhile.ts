import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function dropLastWhileImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[] {
  let index = array.length - 1;
  while (index >= 0 && predicate(array[index], index, array)) {
    index--;
  }
  return array.slice(0, index + 1);
}

/**
 * Drops elements from the end of an array while the predicate function returns true
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to process
 * @returns Returns a new array with elements dropped from the end while predicate returns true
 * @example
 * const array = [1, 2, 3, 4, 5];
 * dropLastWhile(x => x > 3, array); // [1, 2, 3]
 * dropLastWhile(x => x > 0, array); // []
 * dropLastWhile(x => x > 3)(array); // [1, 2, 3]
 */
export const dropLastWhile = curry(dropLastWhileImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[];
  <T>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
