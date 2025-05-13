import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function updateImpl<T, const I>(index: number, item: I, array: ArrayContainer<T>): (T | I)[] {
  if (array.length === 0) return [];
  const normalizedIndex = index < 0 ? array.length + index : index;
  if (normalizedIndex < 0 || normalizedIndex >= array.length) {
    return [...array];
  }
  return [...array.slice(0, normalizedIndex), item, ...array.slice(normalizedIndex + 1)];
}

/**
 * Updates an element at the specified index in an array
 *
 * @category Array
 * @param index - The index of the element to update
 * @param item - The new item to replace with
 * @param array - The array to update
 * @returns Returns a new array with the element updated
 * @example
 * const array = [1, 2, 3, 4, 5];
 * update(0, 10, array); // [10, 2, 3, 4, 5]
 * update(-1, 10, array); // [1, 2, 3, 4, 10]
 */
export const update = curry(updateImpl) as {
  <T, const I>(index: number, item: I, array: ArrayContainer<T>): (T | I)[];
  <T, const I>(index: number, item: I): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | I)[];
  <T>(index: number): {
    <T2 extends T, const I2>(item: I2, array: ArrayContainer<T2>): (T2 | I2)[];
    <const I2>(item: I2): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | I2)[];
  };
};
