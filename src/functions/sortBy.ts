import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function sortByImpl<T, U extends number | undefined>(fn: (item: T) => U, array: ArrayContainer<T>): T[] {
  return [...array].sort((a, b) => {
    const aValue = fn(a) ?? 0;
    const bValue = fn(b) ?? 0;
    return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
  });
}

/**
 * Sorts the elements of an array based on the values returned by the given function
 *
 * @category Array
 * @param fn - The function to determine the sort order
 * @param array - The array to sort
 * @returns Returns a new sorted array
 * @example
 * const array = [{id: 3}, {id: 1}, {id: 2}];
 * sortBy(x => x.id, array); // [{id: 1}, {id: 2}, {id: 3}]
 * sortBy(x => x.id)(array); // [{id: 1}, {id: 2}, {id: 3}]
 */
export const sortBy = curry(sortByImpl) as {
  <T, U extends number | undefined>(fn: (item: T) => U, array: ArrayContainer<T>): T[];
  <T, U extends number | undefined>(fn: (item: T) => U): (array: ArrayContainer<T>) => T[];
};
