import { ArrayContainer } from '../shared/types/Array';
import { curry } from './curry';

export type Zip<A extends readonly unknown[], B extends readonly unknown[]> = A extends readonly []
  ? []
  : B extends readonly []
    ? []
    : A extends readonly [infer AHead, ...infer ATail]
      ? B extends readonly [infer BHead, ...infer BTail]
        ? [[AHead, BHead], ...Zip<ATail, BTail>]
        : []
      : [];

function zipImpl<const T, const U>(array2: ArrayContainer<U>, array1: ArrayContainer<T>): [T, U][] {
  const length = Math.min(array1.length, array2.length);
  const result: [T, U][] = [];
  for (let i = 0; i < length; i++) {
    result.push([array1[i], array2[i]]);
  }
  return result;
}

/**
 * Creates an array of paired elements from two arrays
 *
 * @category Array
 * @param array1 - The first array
 * @param array2 - The second array
 * @returns Returns an array of paired elements
 * @example
 * const array1 = [1, 2, 3];
 * const array2 = ['a', 'b', 'c'];
 * zip(array1, array2); // [[1, 'a'], [2, 'b'], [3, 'c']]
 * zip(array1)(array2); // [[1, 'a'], [2, 'b'], [3, 'c']]
 */
export const zip = curry(zipImpl) as {
  <const T extends ArrayContainer, const U extends ArrayContainer>(array2: U, array1: T): Zip<T, U>;
  <const U extends ArrayContainer>(array2: U): <const T extends ArrayContainer>(array1: T) => Zip<T, U>;
};
