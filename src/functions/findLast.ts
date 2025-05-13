import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function findLastImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T | undefined {
  return array.findLast(predicate);
}

/**
 * Returns the last element in the array that satisfies the predicate function
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to search
 * @returns Returns the last element that passes the predicate check, or undefined if no element passes
 * @example
 * const array = [1, 2, 3, 4, 5];
 * findLast(x => x > 3, array); // 5
 * findLast(x => x > 10, array); // undefined
 * findLast(x => x > 3)(array); // 5
 */
export const findLast = curry(findLastImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T | undefined;
  <T>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => T2 | undefined;
};
