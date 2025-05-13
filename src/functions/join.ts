import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function joinImpl<T>(separator: string, array: ArrayContainer<T>): string {
  return array.join(separator);
}

/**
 * Joins all elements of an array into a string using the specified separator
 *
 * @category Array
 * @param separator - The string to use as a separator
 * @param array - The array to join
 * @returns Returns the joined string
 * @example
 * const array = [1, 2, 3, 4, 5];
 * join(',', array); // '1,2,3,4,5'
 * join('|', array); // '1|2|3|4|5'
 * join(',')(array); // '1,2,3,4,5'
 */
export const join = curry(joinImpl) as {
  <T extends ArrayContainer>(separator: string, array: T): string;
  (separator: string): <T extends ArrayContainer>(array: T) => string;
};
