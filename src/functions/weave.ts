import { ArrayContainer } from '../shared/types/Array';

function weaveImpl<T>(arrays: ArrayContainer<ArrayContainer<T>>): T[] {
  const maxLength = Math.max(0, ...arrays.map(arr => arr.length));
  const result: T[] = [];
  for (let i = 0; i < maxLength; i++) {
    for (let j = 0; j < arrays.length; j++) {
      if (i < arrays[j].length) {
        result.push(arrays[j][i]);
      }
    }
  }
  return result;
}

/**
 * Interleaves multiple arrays, taking elements from each array in turn
 *
 * @category Array
 * @param arrays - The arrays to interleave
 * @returns Returns a new array with elements interleaved from the input arrays
 * @example
 * weave([[1, 2, 3], [4, 5], [6, 7, 8]]) // [1, 4, 6, 2, 5, 7, 3, 8]
 */
export const weave = weaveImpl;
