import { ArrayContainer } from '../shared/types/Array';

function pairwiseImpl<T>(array: ArrayContainer<T>): [T, T][] {
  if (array.length < 2) return [];

  const result: [T, T][] = [];
  for (let i = 0; i < array.length - 1; i += 2) {
    if (i + 1 < array.length) {
      result.push([array[i], array[i + 1]]);
    }
  }
  return result;
}

/**
 * Returns an array of pairs from the input array, where each pair contains two consecutive elements
 * This is a special case of chunk(2)
 *
 * @category Array
 * @param array - The input array
 * @returns Returns an array of pairs
 * @example
 * const array = [1, 2, 3, 4, 5];
 * pairwise(array); // [[1, 2], [3, 4]]
 * pairwise([1, 2, 3]); // [[1, 2]]
 */
export const pairwise = pairwiseImpl;
