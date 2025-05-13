import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function noneImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): boolean {
  return !array.some(predicate);
}

/**
 * Checks if none of the elements in the array satisfy the given predicate function
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to check
 * @returns Returns true if no elements satisfy the predicate function, false otherwise
 * @example
 * const array = [1, 2, 3, 4, 5];
 * none(x => x < 0, array); // true
 * none(x => x > 3, array); // false
 * none(x => x < 0)(array); // true
 */
export const none = curry(noneImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): boolean;
  <T>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => boolean;
};
