import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function partitionImpl<T>(predicate: (value: T, index: number, array: ArrayContainer<T>) => boolean, array: ArrayContainer<T>): [T[], T[]] {
  const left: T[] = [];
  const right: T[] = [];
  for (let i = 0; i < array.length; i++) {
    if (predicate(array[i], i, array)) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  return [left, right];
}

/**
 * Partitions the array into two arrays based on the predicate function
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to partition
 * @returns Returns a tuple containing two arrays: [elements that satisfy the predicate, elements that don't]
 * @example
 * const array = [1, 2, 3, 4, 5];
 * partition(x => x % 2 === 0, array); // [[2, 4], [1, 3, 5]]
 * partition(x => x % 2 === 0)(array); // [[2, 4], [1, 3, 5]]
 */
export const partition = curry(partitionImpl) as {
  <T>(predicate: (value: T, index: number, array: ArrayContainer<T>) => boolean, array: ArrayContainer<T>): [T[], T[]];
  <T>(predicate: (value: T, index: number, array: ArrayContainer<T>) => boolean): <T2 extends T>(array: ArrayContainer<T2>) => [T2[], T2[]];
};
