import { curry } from './curry';
import { ArrayContainer, ArrayReducer } from '../shared/types/Array';

function reduceRightImpl<T, A>(reducer: ArrayReducer<A, T>, initialValue: A, array: ArrayContainer<T>): A {
  let acc = initialValue;
  for (let i = array.length - 1; i >= 0; i--) {
    acc = reducer(acc, array[i], i, array);
  }
  return acc;
}

/**
 * Reduces the array from right to left using the provided reducer function
 *
 * @category Array
 * @param reducer - The reducer function to apply
 * @param initialValue - The initial value for the reduction
 * @param array - The array to reduce
 * @returns Returns the reduced value
 * @example
 * const array = [1, 2, 3, 4, 5];
 * reduceRight((acc, val) => acc + val, 0, array); // 15
 * reduceRight((acc, val) => acc + val, 0)(array); // 15
 */
export const reduceRight = curry(reduceRightImpl) as {
  <T, A>(reducer: ArrayReducer<A, T>, initialValue: A, array: ArrayContainer<T>): A;
  <T, A>(reducer: ArrayReducer<A, T>, initialValue: A): <T2 extends T>(array: ArrayContainer<T2>) => A;
  <T, A>(
    reducer: ArrayReducer<A, T>
  ): {
    <T2 extends T, A2 extends A>(initialValue: A, array: ArrayContainer<T2>): A2 | A;
    <const A2 extends A>(initialValue: A2): <T2 extends T>(array: ArrayContainer<T2>) => A2 | A;
  };
};
