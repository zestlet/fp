import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function rejectImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[] {
  const result: T[] = [];
  for (let i = 0; i < array.length; i++) {
    const item = array[i];
    if (!predicate(item, i, array)) {
      result.push(item);
    }
  }
  return result;
}

/**
 * Filters out elements that satisfy the predicate function
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to filter
 * @returns Returns a new array containing elements that do not satisfy the predicate
 * @example
 * const array = [1, 2, 3, 4, 5];
 * reject(x => x > 3, array); // [1, 2, 3]
 * reject(x => x % 2 === 0, array); // [1, 3, 5]
 */
export const reject = curry(rejectImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[];
  <T>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
