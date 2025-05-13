import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function countByImpl<T, K extends PropertyKey>(callbackFn: ArrayCallback<T, K>, array: ArrayContainer<T>): Record<K, number> {
  return array.reduce(
    (acc, item, index, arr) => {
      const key = callbackFn(item, index, arr);
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    },
    {} as Record<K, number>
  );
}

/**
 * Counts the occurrences of elements in an array based on a key function
 *
 * @category Array
 * @param callbackFn - The function to generate keys for counting
 * @param array - The array to count elements from
 * @returns Returns an object with keys from callbackFn and their counts as values
 * @example
 * const array = [1, 2, 3, 4, 5];
 * countBy(x => x % 2 === 0 ? 'even' : 'odd', array); // { odd: 3, even: 2 }
 * countBy(x => x % 2 === 0 ? 'even' : 'odd')(array); // { odd: 3, even: 2 }
 */
export const countBy = curry(countByImpl) as {
  <T, K extends PropertyKey>(callbackFn: ArrayCallback<T, K>, array: ArrayContainer<T>): Record<K, number>;
  <T, K extends PropertyKey>(callbackFn: ArrayCallback<T, K>): <T2 extends T>(array: ArrayContainer<T2>) => Record<K, number>;
};
