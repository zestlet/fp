import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function padRightImpl<T, U, N extends number>(length: N, value: U, array: ArrayContainer<T>): (T | U)[] {
  if (length <= array.length) return [...array];
  const padLength = length - array.length;
  return [...array, ...Array(padLength).fill(value)];
}

/**
 * Pads the array with a value on the right side until it reaches the specified length
 *
 * @category Array
 * @param length - The target length of the array
 * @param value - The value to pad with
 * @param array - The array to pad
 * @returns Returns a new array padded to the specified length
 * @example
 * const array = [1, 2, 3];
 * padRight(5, 0, array); // [1, 2, 3, 0, 0]
 * padRight(2, 0, array); // [1, 2, 3]
 */
export const padRight = curry(padRightImpl) as {
  <T, U, N extends number>(length: N, value: U, array: ArrayContainer<T>): (T | U)[];
  <T, U, N extends number>(length: N, value: U): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | U)[];
  <T, U, N extends number>(
    length: N
  ): {
    <U2 extends U, T2 extends T>(value: U2, array: ArrayContainer<T2>): (T2 | U2)[];
    <U2 extends U>(value: U2): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | U2)[];
  };
};
