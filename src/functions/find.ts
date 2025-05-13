import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function findImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T | undefined {
  return array.find(predicate);
}

/**
 * Returns the first element in the array that satisfies the predicate function
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to search
 * @returns Returns the first element that passes the predicate check, or undefined if no element passes
 * @example
 * const array = [1, 2, 3, 4, 5];
 * find(x => x > 3, array); // 4
 * find(x => x > 10, array); // undefined
 * find(x => x > 3)(array); // 4
 */
export const find = curry(findImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T | undefined;
  <T = any>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => T2 | undefined;
};
