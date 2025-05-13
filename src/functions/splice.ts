import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function spliceImpl<T, U>(start: number, deleteCount: number, items: ArrayContainer<U>, array: ArrayContainer<T>): (T | U)[] {
  const normalizedStart = start < 0 ? Math.max(array.length + start, 0) : Math.min(start, array.length);
  const normalizedDeleteCount = Math.max(0, Math.min(deleteCount, array.length - normalizedStart));

  return [...array.slice(0, normalizedStart), ...items, ...array.slice(normalizedStart + normalizedDeleteCount)];
}

/**
 * Modifies the contents of an array by removing or replacing existing elements and/or adding new elements
 *
 * @category Array
 * @param start - The index at which to begin changing the array
 * @param deleteCount - The number of elements to remove
 * @param items - The elements to add to the array
 * @param array - The array to modify
 * @returns Returns a new array with the specified changes
 * @example
 * const array = [1, 2, 3, 4, 5];
 * splice(1, 2, [6, 7], array); // [1, 6, 7, 4, 5]
 * splice(1, 2)([6, 7])(array); // [1, 6, 7, 4, 5]
 */
export const splice = curry(spliceImpl) as {
  <T, U>(start: number, deleteCount: number, items: ArrayContainer<U>, array: ArrayContainer<T>): (T | U)[];
  <T, U>(start: number, deleteCount: number, items: ArrayContainer<U>): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | U)[];
  <T, U>(
    start: number,
    deleteCount: number
  ): {
    <T2 extends T, U2 extends U>(items: ArrayContainer<U2>, array: ArrayContainer<T2>): (T2 | U2)[];
    <U2 extends U>(items: ArrayContainer<U2>): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | U2)[];
  };
  <T, U>(
    start: number
  ): {
    <T2 extends T, U2 extends U>(deleteCount: number, items: ArrayContainer<U2>, array: ArrayContainer<T2>): (T2 | U2)[];
    <U2 extends U>(deleteCount: number, items: ArrayContainer<U2>): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | U2)[];
    (deleteCount: number): {
      <T2 extends T, U2 extends U>(items: ArrayContainer<U2>, array: ArrayContainer<T2>): (T2 | U2)[];
      <U2 extends U>(items: ArrayContainer<U2>): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | U2)[];
    };
  };
};
