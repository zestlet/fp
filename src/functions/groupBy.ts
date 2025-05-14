import { curry } from './curry';
import { ArrayContainer, ArrayCallback } from '../shared/types/Array';

function groupByImpl<T, K extends PropertyKey>(callbackFn: ArrayCallback<T, K>, array: ArrayContainer<T>): Record<K, T[]> {
  return array.reduce(
    (acc, item, index) => {
      const key = callbackFn(item, index, array);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<K, T[]>
  );
}

/**
 * Groups the elements of an array based on the result of a key function
 *
 * @category Array
 * @param callbackFn - The function to determine the group key for each element
 * @param array - The array to group
 * @returns Returns an object where the keys are the group keys and the values are arrays of grouped elements
 * @example
 * const array = [1, 2, 3, 4, 5];
 * groupBy(x => x % 2 === 0 ? 'even' : 'odd', array); // { odd: [1, 3, 5], even: [2, 4] }
 * groupBy(x => x.toString(), array); // { '1': [1], '2': [2], '3': [3], '4': [4], '5': [5] }
 * groupBy(x => x % 2 === 0 ? 'even' : 'odd')(array); // { odd: [1, 3, 5], even: [2, 4] }
 */
export const groupBy = curry(groupByImpl) as {
  <T, K extends PropertyKey>(callbackFn: ArrayCallback<T, K>, array: ArrayContainer<T>): Record<K, T[]>;
  <Fn extends ArrayCallback<any, PropertyKey>>(
    callbackFn: Fn
  ): <T extends Parameters<Fn>[0], K extends ReturnType<Fn>>(array: ArrayContainer<T>) => Record<K, T[]>;
};
