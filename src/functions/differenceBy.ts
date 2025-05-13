import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function differenceByImpl<T, U, I>(iteratee: ArrayCallback<T | U, I>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): T[] {
  const values2 = new Set(array2.map(iteratee));
  return array1.filter((item, index, array) => !values2.has(iteratee(item, index, array)));
}

/**
 * Creates an array of values from the first array that are not present in the second array,
 * using an iteratee function to determine equality
 *
 * @category Array
 * @param iteratee - The function invoked per element
 * @param array1 - The array to inspect
 * @param array2 - The array of values to exclude
 * @returns Returns the new array of filtered values
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }];
 * const array2 = [{ x: 1 }];
 * differenceBy(item => item.x, array1, array2); // => [{ x: 2 }]
 */
export const differenceBy = curry(differenceByImpl) as {
  <T, U, I>(iteratee: ArrayCallback<T | U, I>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): T[];
  <T, U, I>(
    iteratee: ArrayCallback<T | U, I>
  ): <T2 extends T, U2 extends U>(array2: ArrayContainer<U2>, array1: ArrayContainer<T2>) => T2[];
  <T, U, I>(
    iteratee: ArrayCallback<T | U, I>
  ): <T2 extends T, U2 extends U>(array2: ArrayContainer<U2>) => <T3 extends T2>(array1: ArrayContainer<T3>) => T3[];
};
