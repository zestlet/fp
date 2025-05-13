import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
import { Comparator } from '../shared/types/Common';

function unionWithImpl<T, U>(comparator: Comparator<T | U, U, boolean>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): (T | U)[] {
  const result: (T | U)[] = [...array1];
  for (const item2 of array2) {
    if (!result.some(item1 => comparator(item1, item2))) {
      result.push(item2);
    }
  }
  return result;
}

/**
 * Creates an array of unique values from all given arrays,
 * using a custom comparator function to determine equality
 *
 * @category Array
 * @param comparator - The function used to compare elements
 * @param array1 - The first array to inspect
 * @param array2 - The second array to inspect
 * @returns Returns the new array of combined values
 * @example
 * const array1 = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
 * const array2 = [{ x: 1, y: 2 }, { x: 3, y: 4 }];
 * unionWith((a, b) => a.x === b.x && a.y === b.y, array1, array2); // => [{ x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 4 }]
 */
export const unionWith = curry(unionWithImpl) as {
  <T, U>(comparator: Comparator<T | U, U, boolean>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): (T | U)[];
  <T, U>(comparator: Comparator<T | U, U, boolean>, array2: ArrayContainer<U>): <T2 extends T>(array1: ArrayContainer<T2>) => (T2 | U)[];
  <T, U>(
    comparator: Comparator<T | U, U, boolean>
  ): {
    <U2 extends U, T2 extends T>(array2: ArrayContainer<U2>, array1: ArrayContainer<T2>): (T2 | U2)[];
    <U2 extends U>(array2: ArrayContainer<U2>): <T2 extends T>(array1: ArrayContainer<T2>) => (T2 | U2)[];
  };
};
