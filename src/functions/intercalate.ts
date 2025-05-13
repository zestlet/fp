import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function intercalateImpl<T extends ArrayContainer, S>(separator: S, arrays: ArrayContainer<T>): (T[number] | S)[] {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return [...arrays[0]];

  return arrays
    .reduce(
      (acc, curr, index) => {
        if (index === 0) return [curr];
        return [...acc, separator, curr];
      },
      [] as (T[number] | S)[]
    )
    .flat();
}

/**
 * Inserts a separator between each element of the array and flattens one level
 *
 * @category Array
 * @param separator - The separator to insert between elements
 * @param arrays - The array of arrays to intercalate
 * @returns Returns a new array with the separator inserted between elements and flattened one level
 * @example
 * const arrays = [[1, 2], [3, 4], [5, 6]];
 * intercalate(0, arrays); // [1, 2, 0, 3, 4, 0, 5, 6]
 * intercalate('|', arrays); // [1, 2, '|', 3, 4, '|', 5, 6]
 * intercalate(0)(arrays); // [1, 2, 0, 3, 4, 0, 5, 6]
 */
export const intercalate = curry(intercalateImpl) as {
  <T extends ArrayContainer, S>(separator: S, arrays: ArrayContainer<T>): (T[number] | S)[];
  <T extends ArrayContainer, S>(separator: S): <T2 extends T>(arrays: ArrayContainer<T2>) => (T2[number] | S)[];
};
