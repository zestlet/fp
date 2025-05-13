import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
import { Comparator } from '../shared/types/Common';

function differenceWithImpl<T, U>(comparator: Comparator<T, U, boolean>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): T[] {
  return array1.filter(item1 => !array2.some(item2 => comparator(item1, item2)));
}

/**
 * Creates an array of values from the first array that are not present in the second array,
 * using a custom comparator function to determine equality
 *
 * @category Array
 * @param comparator - The function used to compare elements
 * @param array1 - The array to inspect
 * @param array2 - The array of values to exclude
 * @returns Returns the new array of filtered values
 * @example
 * const array1 = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
 * const array2 = [{ x: 1, y: 2 }];
 * differenceWith((a, b) => a.x === b.x && a.y === b.y, array1, array2); // => [{ x: 2, y: 1 }]
 */
export const differenceWith = curry(differenceWithImpl) as {
  <T, U>(comparator: Comparator<T, U, boolean>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): T[];
  <T, U>(comparator: Comparator<T, U, boolean>, array2: ArrayContainer<U>): <T2 extends T>(array1: ArrayContainer<T2>) => T2[];
  <T, U>(
    comparator: Comparator<T, U, boolean>
  ): {
    <U2 extends U, T2 extends T>(array2: ArrayContainer<U2>, array1: ArrayContainer<T2>): T2[];
    <U2 extends U>(array2: ArrayContainer<U2>): <T2 extends T>(array1: ArrayContainer<T2>) => T2[];
  };
};
