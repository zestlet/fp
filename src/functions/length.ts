import { ArrayContainer } from '../shared/types/Array';

function lengthImpl<T extends ArrayContainer>(array: T): T['length'] {
  return array.length;
}

/**
 * Returns the length of an array
 *
 * @category Array
 * @param array - The array to get the length from
 * @returns Returns the length of the array
 * @example
 * const array = [1, 2, 3, 4, 5];
 * length(array); // 5
 * length([]); // 0
 * length()(array); // 5
 */
export const length = lengthImpl;
