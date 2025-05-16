import { curry } from './curry';
import { ArrayContainer, ArrayReducer } from '../shared/types/Array';

function scanRightImpl<T, A>(reducer: ArrayReducer<A, T>, initialValue: A, array: ArrayContainer<T>): A[] {
  const result: A[] = [initialValue];
  for (let i = array.length - 1; i >= 0; i--) {
    result.unshift(reducer(result[0], array[i], i, array));
  }
  return result;
}

/**
 * Scans the array from right to left using the provided reducer function, returning an array of all intermediate values
 *
 * @category Array
 * @param reducer - The reducer function to apply
 * @param initialValue - The initial value for the reduction
 * @param array - The array to scan
 * @returns Returns an array containing all intermediate values
 * @example
 * const array = [1, 2, 3, 4, 5];
 * scanRight((acc, val) => acc + val, 0, array); // [15, 14, 12, 9, 5, 0]
 * scanRight((acc, val) => acc + val, 0)(array); // [15, 14, 12, 9, 5, 0]
 */
export const scanRight = curry(scanRightImpl) as {
  <T, A>(reducer: ArrayReducer<A, T>, initialValue: A, array: ArrayContainer<T>): A[];
  <T, A>(reducer: ArrayReducer<A, T>, initialValue: A): <T2 extends T>(array: ArrayContainer<T2>) => A[];
  <T, A>(
    reducer: ArrayReducer<A, T>
  ): {
    <T2 extends T, A2 extends A>(initialValue: A, array: ArrayContainer<T2>): (A2 | A)[];
    <const A2 extends A>(initialValue: A2): <T2 extends T>(array: ArrayContainer<T2>) => (A2 | A)[];
  };
};
