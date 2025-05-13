import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function intersectionImpl<T, U>(array2: ArrayContainer<U>, array1: ArrayContainer<T>): (T & U)[] {
  return array1.filter(item => array2.includes(item as unknown as U)) as (T & U)[];
}

/**
 * Returns an array containing elements that exist in both arrays
 *
 * @category Array
 * @param array1 - The first array to compare
 * @param array2 - The second array to compare against
 * @returns Returns a new array containing elements common to both arrays
 * @example
 * const array1 = [1, 2, 3, 4, 5];
 * const array2 = [2, 4, 6];
 * intersection(array1, array2); // [2, 4]
 * intersection(array1)(array2); // [2, 4]
 */
export const intersection = curry(intersectionImpl) as {
  <T, U>(array2: ArrayContainer<U>, array1: ArrayContainer<T>): (T & U)[];
  <T, U>(array2: ArrayContainer<U>): <T2 extends T>(array1: ArrayContainer<T2>) => (T2 & U)[];
};
