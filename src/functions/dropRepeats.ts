import { ArrayContainer } from '../shared/types/Array';

function dropRepeatsImpl<T>(array: ArrayContainer<T>): T[] {
  if (array.length === 0) return [];
  return array.reduce<T[]>((acc, curr, index) => {
    if (index === 0 || curr !== array[index - 1]) {
      acc.push(curr);
    }
    return acc;
  }, []);
}

/**
 * Removes consecutive duplicate elements from an array
 *
 * @category Array
 * @param array - The array to remove consecutive duplicates from
 * @returns Returns a new array with consecutive duplicates removed
 * @example
 * const array = [1, 1, 2, 2, 3, 3, 3, 4];
 * dropRepeats(array); // [1, 2, 3, 4]
 */
export const dropRepeats = dropRepeatsImpl;
