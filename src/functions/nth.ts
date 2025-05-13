import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function nthImpl<T>(index: number, array: ArrayContainer<T>): T | undefined {
  return array.at(index);
}

/**
 * Gets the element at the specified index in an array
 *
 * @category Array
 * @param index - The index of the element to get
 * @param array - The array to get the element from
 * @returns Returns the element at the specified index, or undefined if the index is out of bounds
 * @example
 * const array = [1, 2, 3, 4, 5];
 * nth(2, array); // 3
 * nth(-1, array); // 5
 * nth(2)(array); // 3
 */
export const nth = curry(nthImpl) as {
  <T>(index: number, array: ArrayContainer<T>): T | undefined;
  <T>(index: number): <T2 extends T>(array: ArrayContainer<T2>) => T2 | undefined;
};
