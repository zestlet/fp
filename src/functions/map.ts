import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function mapImpl<T, U>(callbackFn: ArrayCallback<T, U>, array: ArrayContainer<T>): U[] {
  return array.map(callbackFn);
}

/**
 * Maps each element in an array using a callback function
 *
 * @category Array
 * @param callbackFn - The function to map each element
 * @param array - The array to map
 * @returns Returns a new array with each element mapped by the callback function
 * @example
 * const array = [1, 2, 3, 4, 5];
 * map(x => x * 2, array); // [2, 4, 6, 8, 10]
 * map(x => x.toString())(array); // ['1', '2', '3', '4', '5']
 */
export const map = curry(mapImpl) as {
  <T, U>(callbackFn: (item: T, index: number, array: ArrayContainer<T>) => U, array: ArrayContainer<T>): U[];
  <T, U>(callbackFn: (item: T, index: number, array: ArrayContainer<T>) => U): (array: ArrayContainer<T>) => U[];
};
