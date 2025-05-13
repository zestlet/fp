import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
import { Comparator } from '../shared/types/Common';

function dropRepeatsWithImpl<T>(comparator: Comparator<T, T, boolean>, array: ArrayContainer<T>): T[] {
  if (array.length === 0) return [];
  return array.reduce<T[]>((acc, curr, index) => {
    if (index === 0 || !comparator(curr, array[index - 1])) {
      acc.push(curr);
    }
    return acc;
  }, []);
}

/**
 * Removes consecutive duplicate elements from an array using a custom comparison function
 *
 * @category Array
 * @param comparator - The function to compare consecutive elements
 * @param array - The array to remove consecutive duplicates from
 * @returns Returns a new array with consecutive duplicates removed
 * @example
 * const array = [{ id: 1 }, { id: 1 }, { id: 2 }, { id: 2 }];
 * dropRepeatsWith((a, b) => a.id === b.id, array); // [{ id: 1 }, { id: 2 }]
 */
export const dropRepeatsWith = curry(dropRepeatsWithImpl) as {
  <T>(comparator: Comparator<T, T, boolean>, array: ArrayContainer<T>): T[];
  <T>(comparator: Comparator<T, T, boolean>): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
