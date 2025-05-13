import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function findLastIndexImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): number {
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i], i, array)) {
      return i;
    }
  }
  return -1;
}

/**
 * Returns the index of the last element in the array that satisfies the predicate function
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to search
 * @returns Returns the index of the last element that passes the predicate check, or -1 if no element passes
 * @example
 * const array = [1, 2, 3, 4, 5, 3];
 * findLastIndex(x => x === 3, array); // 5
 * findLastIndex(x => x < 0, array); // -1
 * findLastIndex(x => x === 3)(array); // 5
 */
export const findLastIndex = curry(findLastIndexImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): number;
  <T>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => number;
};
