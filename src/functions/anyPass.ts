import { curry } from './curry';
import { Predicate } from '../shared/types/Common';
import { ArrayContainer } from '../shared/types/Array';

function anyPassImpl<T>(predicates: ArrayContainer<Predicate<T>>, value: T): boolean {
  if (predicates.length === 0) return false;
  return predicates.some(predicate => predicate(value));
}

/**
 * Checks if a value satisfies any of the given predicate functions
 *
 * @category Array
 * @param predicates - The array of predicate functions to test the value
 * @param value - The value to check
 * @returns Returns true if the value satisfies any predicate, false otherwise
 * @example
 * const predicates = [x => x > 0, x => x < 10];
 * anyPass(predicates, 15); // true
 * anyPass(predicates, -5); // false
 * anyPass(predicates)(15); // true
 */
export const anyPass = curry(anyPassImpl) as {
  <T>(predicates: ArrayContainer<Predicate<T>>, value: T): boolean;
  <T>(predicates: ArrayContainer<Predicate<T>>): <T2 extends T>(value: T2) => boolean;
};
