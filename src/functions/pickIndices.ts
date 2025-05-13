import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function pickIndicesImpl<T>(indices: number[], array: ArrayContainer<T>): T[] {
  return indices.map(index => array[index]).filter((_, i) => indices[i] >= 0 && indices[i] < array.length);
}

/**
 * Creates a new array with elements from the input array at the specified indices
 *
 * @category Array
 * @param indices - The array of indices to pick
 * @param array - The array to pick from
 * @returns Returns a new array containing elements at the specified indices
 * @example
 * const array = ['a', 'b', 'c', 'd'];
 * pickIndices([0, 2], array); // ['a', 'c']
 * pickIndices([1, 3, 5], array); // ['b', 'd']
 */
export const pickIndices = curry(pickIndicesImpl) as {
  <T>(indices: number[], array: ArrayContainer<T>): T[];
  (indices: number[]): <T>(array: ArrayContainer<T>) => T[];
};
