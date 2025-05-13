import { ArrayContainer } from '../shared/types/Array';

function unzipImpl<T extends ArrayContainer>(array: ArrayContainer<T>): { [K in keyof T]: T[K][] } {
  if (array.length === 0) return [] as unknown as { [K in keyof T]: T[K][] };

  const length = array[0].length;
  const result = Array.from({ length }, () => []) as { [K in keyof T]: T[K][] };

  for (const tuple of array) {
    for (let i = 0; i < length; i++) {
      result[i].push(tuple[i]);
    }
  }

  return result;
}

/**
 * Transforms an array of tuples into a tuple of arrays
 *
 * @category Array
 * @param array - The array of tuples to unzip
 * @returns Returns a tuple of arrays, where each array contains the elements from the corresponding position in the input tuples
 * @example
 * const array = [[1, 'a'], [2, 'b'], [3, 'c']];
 * unzip(array); // [[1, 2, 3], ['a', 'b', 'c']]
 * unzip([[1, 'a', true], [2, 'b', false]]); // [[1, 2], ['a', 'b'], [true, false]]
 */
export const unzip = unzipImpl;
