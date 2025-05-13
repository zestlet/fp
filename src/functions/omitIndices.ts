import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function omitIndicesImpl<T, U extends number>(indices: ArrayContainer<U>, array: ArrayContainer<T>): T[] {
  const indexSet = new Set(indices);
  return array.filter((_, index) => !indexSet.has(index as U));
}

/**
 * Creates a new array excluding elements at the specified indices
 *
 * @category Array
 * @param indices - The array of indices to omit
 * @param array - The array to omit from
 * @returns Returns a new array excluding elements at the specified indices
 * @example
 * const array = ['a', 'b', 'c', 'd'];
 * omitIndices([0, 2], array); // ['b', 'd']
 * omitIndices([1, 3], array); // ['a', 'c']
 */
export const omitIndices = curry(omitIndicesImpl) as {
  <T, U extends number>(indices: ArrayContainer<U>, array: ArrayContainer<T>): T[];
  <T, U extends number>(indices: ArrayContainer<U>): <T2 extends T>(array: ArrayContainer<T2>) => T2[];
};
