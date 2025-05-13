import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function intersectionByImpl<T, U, I>(iteratee: ArrayCallback<T | U, I>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): T[] {
  const values2 = new Set(array2.map(iteratee));
  return array1.filter((item, index, array) => values2.has(iteratee(item, index, array)));
}

/**
 * Creates an array of values that are included in both arrays,
 * using an iteratee function to determine equality
 *
 * @category Array
 * @param iteratee - The function invoked per element
 * @param array1 - The first array to inspect
 * @param array2 - The second array to inspect
 * @returns Returns the new array of intersecting values
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }];
 * const array2 = [{ x: 1 }, { x: 3 }];
 * intersectionBy(item => item.x, array1, array2); // => [{ x: 1 }]
 */
export const intersectionBy = curry(intersectionByImpl) as {
  <T, U, I>(iteratee: ArrayCallback<T | U, I>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): T[];
  <T, U, I>(iteratee: ArrayCallback<T | U, I>, array2: ArrayContainer<U>): <T2 extends T>(array1: ArrayContainer<T2>) => T2[];
  <T, U, I>(
    iteratee: ArrayCallback<T | U, I>
  ): {
    <T2 extends T, U2 extends U>(array2: ArrayContainer<U2>, array1: ArrayContainer<T2>): T2[];
    <T2 extends T, U2 extends U>(array2: ArrayContainer<U2>): <T3 extends T2>(array1: ArrayContainer<T3>) => T3[];
  };
};
