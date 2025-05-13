import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function allImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): boolean {
  return array.every(predicate);
}

/**
 * Checks if all elements in the array satisfy the given predicate function
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to check
 * @returns Returns true if all elements satisfy the predicate function, false otherwise
 * @example
 * const array = [1, 2, 3, 4, 5];
 * all(x => x > 0, array); // true
 * all(x => x > 3, array); // false
 * all(x => x > 0)(array); // true
 */

export const all = curry(allImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): boolean;
  <T1>(predicate: ArrayPredicate<T1>): <T2 extends T1>(array: ArrayContainer<T2>) => boolean;
};
