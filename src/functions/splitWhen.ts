import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function splitWhenImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): [T[], T[]] {
  const index = array.findIndex(predicate);
  if (index === -1) return [[...array], []];
  return [array.slice(0, index), array.slice(index)];
}

/**
 * Splits the array into two parts at the first element that satisfies the predicate
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to split
 * @returns Returns a tuple containing two arrays: [elements before the first match, elements from the first match onwards]
 * @example
 * const array = [1, 2, 3, 4, 5];
 * splitWhen(x => x > 3, array); // [[1, 2, 3], [4, 5]]
 * splitWhen(x => x > 3)(array); // [[1, 2, 3], [4, 5]]
 */
export const splitWhen = curry(splitWhenImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): [T[], T[]];
  <T>(predicate: ArrayPredicate<T>): <T2 extends T>(array: ArrayContainer<T2>) => [T2[], T2[]];
};
