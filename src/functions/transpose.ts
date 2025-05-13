import { ArrayContainer } from '../shared/types/Array';

function transposeImpl<T>(array: ArrayContainer<ArrayContainer<T>>): T[][] {
  if (array.length === 0) return [];

  const minLength = Math.min(...array.map(row => row.length));
  const result: T[][] = [];

  for (let i = 0; i < minLength; i++) {
    result.push(array.map(row => row[i]));
  }

  return result;
}

/**
 * Transposes the rows and columns of a two-dimensional array
 *
 * @category Array
 * @param array - The array to transpose
 * @returns Returns a new transposed array
 * @example
 * const array = [[1, 2], [3, 4], [5, 6]];
 * transpose(array); // => [[1, 3, 5], [2, 4, 6]]
 */
export const transpose = transposeImpl;
