import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function unionByImpl<T, U, I>(iteratee: ArrayCallback<T | U, I>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): (T | U)[] {
  const seen = new Set<I>();
  const result: (T | U)[] = [];

  let i = 0;
  for (const item of array1) {
    const value = iteratee(item, i++, array1);
    if (!seen.has(value)) {
      seen.add(value);
      result.push(item);
    }
  }

  i = 0;
  for (const item of array2) {
    const value = iteratee(item, i++, array2);
    if (!seen.has(value)) {
      seen.add(value);
      result.push(item);
    }
  }

  return result;
}

/**
 * Creates an array of unique values from all given arrays,
 * using an iteratee function to determine equality
 *
 * @category Array
 * @param iteratee - The function invoked per element
 * @param array1 - The first array to inspect
 * @param array2 - The second array to inspect
 * @returns Returns the new array of combined values
 * @example
 * const array1 = [{ x: 1 }, { x: 2 }];
 * const array2 = [{ x: 1 }, { x: 3 }];
 * unionBy(item => item.x, array1, array2); // => [{ x: 1 }, { x: 2 }, { x: 3 }]
 */
export const unionBy = curry(unionByImpl) as {
  <T, U, I>(iteratee: ArrayCallback<T | U, I>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): (T | U)[];
  <T, U, I>(
    iteratee: ArrayCallback<T | U, I>
  ): <T2 extends T, U2 extends U>(array2: ArrayContainer<U2>, array1: ArrayContainer<T2>) => (T | U)[];
  <T, U, I>(
    iteratee: ArrayCallback<T | U, I>
  ): <T2 extends T, U2 extends U>(array2: ArrayContainer<U2>) => <T3 extends T2>(array1: ArrayContainer<T3>) => (T | U)[];
};
