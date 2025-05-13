import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
import { Comparator } from '../shared/types/Common';

function intersectionWithImpl<T, U>(comparator: Comparator<T, U, boolean>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): T[] {
  return array1.filter(item1 => array2.some(item2 => comparator(item1, item2)));
}

/**
 * Creates an array of values that are included in both arrays,
 * using a custom comparator function to determine equality
 *
 * @category Array
 * @param comparator - The function used to compare elements
 * @param array1 - The first array to inspect
 * @param array2 - The second array to inspect
 * @returns Returns the new array of intersecting values
 * @example
 * const array1 = [{ x: 1, y: 2 }, { x: 2, y: 1 }];
 * const array2 = [{ x: 1, y: 2 }, { x: 3, y: 4 }];
 * intersectionWith((a, b) => a.x === b.x && a.y === b.y, array1, array2); // => [{ x: 1, y: 2 }]
 */
export const intersectionWith = curry(intersectionWithImpl) as {
  <T, U>(comparator: Comparator<T, U, boolean>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): T[];
  <T, U>(comparator: Comparator<T, U, boolean>, array2: ArrayContainer<U>): <T2 extends T>(array2: ArrayContainer<T>) => T2[];
  <T, U>(
    comparator: Comparator<T, U, boolean>
  ): {
    <T2 extends T, U2 extends U>(array2: ArrayContainer<U2>, array1: ArrayContainer<T2>): T2[];
    <T2 extends T, U2 extends U>(array2: ArrayContainer<U2>): <T3 extends T2>(array1: ArrayContainer<T2>) => T3[];
  };
};
