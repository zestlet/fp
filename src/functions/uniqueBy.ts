import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function uniqueByImpl<T, I>(iteratee: ArrayCallback<T, I>, array: ArrayContainer<T>): T[] {
  const seen = new Set<I>();
  const result: T[] = [];

  let i = 0;
  for (const item of array) {
    const key = iteratee(item, i++, array);
    if (!seen.has(key)) {
      seen.add(key);
      result.push(item);
    }
  }

  return result;
}

/**
 * Returns an array of unique elements from the input array based on the iteratee function
 *
 * @category Array
 * @param iteratee - The function to transform elements for comparison
 * @param array - The array to get unique elements from
 * @returns Returns a new array containing only unique elements based on the iteratee
 * @example
 * const array = [{id: 1}, {id: 2}, {id: 1}];
 * uniqueBy(x => x.id, array); // [{id: 1}, {id: 2}]
 * uniqueBy(x => x.id)([{id: 1}, {id: 2}]); // [{id: 1}, {id: 2}]
 */
export const uniqueBy = curry(uniqueByImpl) as {
  <T, I>(iteratee: ArrayCallback<T, I>, array: ArrayContainer<T>): T[];
  <T, I>(iteratee: ArrayCallback<T, I>): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
