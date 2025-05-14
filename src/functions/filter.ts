import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function filterImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[] {
  return array.filter(predicate);
}

/**
 * Filters elements in an array based on a predicate function
 *
 * @category Array
 * @param predicate - The function to test each element
 * @param array - The array to filter
 * @returns Returns a new array with elements that pass the test implemented by the predicate
 * @example
 * const array = [1, 2, 3, 4, 5];
 * filter(x => x % 2 === 0, array); // [2, 4]
 * filter(x => x > 3)(array); // [4, 5]
 */
export const filter = curry(filterImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): T[];
  <Fn extends ArrayPredicate<any>>(predicate: Fn): <T2 extends Parameters<Fn>[0]>(array: ArrayContainer<T2>) => T2[];
};
