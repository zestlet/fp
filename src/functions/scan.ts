import { curry } from './curry';
import { ArrayContainer, ArrayReducer } from '../shared/types/Array';

function scanImpl<T, A>(reducer: ArrayReducer<A, T>, initialValue: A, array: ArrayContainer<T>): A[] {
  const result: A[] = [initialValue];
  let accumulator: A = initialValue;

  for (let i = 0; i < array.length; i++) {
    accumulator = reducer(accumulator, array[i], i, array);
    result.push(accumulator);
  }

  return result;
}

/**
 * Performs a cumulative scan over an array, returning an array of intermediate results
 *
 * @category Array
 * @param reducer - The function used for accumulation
 * @param initialValue - The initial accumulation value
 * @param array - The array to scan
 * @returns Returns an array containing all intermediate accumulation results
 * @example
 * const numbers = [1, 2, 3, 4, 5];
 * scan((acc, curr) => acc + curr, 0, numbers); // [0, 1, 3, 6, 10, 15]
 * scan((acc, curr) => acc + curr, 0)(numbers); // [0, 1, 3, 6, 10, 15]
 */
export const scan = curry(scanImpl) as {
  <T, A>(reducer: ArrayReducer<A, T>, initialValue: A, array: ArrayContainer<T>): A[];
  <T, A>(reducer: ArrayReducer<A, T>, initialValue: A): <T2 extends T>(array: ArrayContainer<T2>) => A[];
  <T, A>(
    reducer: ArrayReducer<A, T>
  ): {
    <T2 extends T, A2 extends A>(initialValue: A, array: ArrayContainer<T2>): (A2 | A)[];
    <const A2 extends A>(initialValue: A2): <T2 extends T>(array: ArrayContainer<T2>) => (A2 | A)[];
  };
};
