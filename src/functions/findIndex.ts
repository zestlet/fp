import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function findIndexImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): number {
  return array.findIndex(predicate);
}

/**
 * Returns the index of the first element in the array that satisfies the predicate function
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to search
 * @returns Returns the index of the first element that passes the predicate check, or -1 if no element passes
 * @example
 * const array = [1, 2, 3, 4, 5];
 * findIndex(x => x > 3, array); // 3
 * findIndex(x => x < 0, array); // -1
 * findIndex(x => x > 3)(array); // 3
 */
export const findIndex = curry(findIndexImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): number;
  <T = any>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => number;
};
