import { curry } from './curry';
import { ArrayPredicate, ArrayContainer } from '../shared/types/Array';

function anyImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): boolean {
  return array.some(predicate);
}

/**
 * Checks if any elements in the array satisfy the given predicate function
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to check
 * @returns Returns true if any elements satisfy the predicate function, false otherwise
 * @example
 * const array = [1, 2, 3, 4, 5];
 * any(x => x > 3, array); // true
 * any(x => x > 5, array); // false
 * any(x => x > 3)(array); // true
 */
export const any = curry(anyImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): boolean;
  <T1>(predicate: ArrayPredicate<T1>): <T2 extends T1>(array: ArrayContainer<T2>) => boolean;
};
