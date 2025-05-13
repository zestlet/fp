import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

type ZipWithTransformer<T, U, R> = (a: T, b: U) => R;

function zipWithImpl<T, U, R>(transformer: ZipWithTransformer<T, U, R>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): R[] {
  const length = Math.min(array1.length, array2.length);
  const result: R[] = [];
  for (let i = 0; i < length; i++) {
    result.push(transformer(array1[i], array2[i]));
  }
  return result;
}

/**
 * Creates a new array by applying a function to corresponding elements from two input arrays
 *
 * @category Array
 * @param transform - The function to apply to each pair of elements
 * @param array1 - The first input array
 * @param array2 - The second input array
 * @returns Returns a new array with the results of applying the transform function to each pair of elements
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = [4, 5, 6];
 * zipWith((a, b) => a + b, array1, array2); // [5, 7, 9]
 * zipWith((a, b) => a * b)(array1)(array2); // [4, 10, 18]
 */
export const zipWith = curry(zipWithImpl) as {
  <T, U, R>(transformer: ZipWithTransformer<T, U, R>, array2: ArrayContainer<U>, array1: ArrayContainer<T>): R[];
  <T, U, R>(transformer: ZipWithTransformer<T, U, R>, array2: ArrayContainer<U>): <T2 extends T>(array1: ArrayContainer<T2>) => R[];
  <T, U, R>(
    transformer: ZipWithTransformer<T, U, R>
  ): {
    <U2 extends U, T2 extends T>(array2: ArrayContainer<U2>, array1: ArrayContainer<T2>): R[];
    <U2 extends U>(array2: ArrayContainer<U2>): <T2 extends T>(array1: ArrayContainer<T2>) => R[];
  };
};
