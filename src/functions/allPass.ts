import { curry } from './curry';
import { Predicate } from '../shared/types/Common';
import { ArrayContainer } from '../shared/types/Array';

function allPassImpl<T>(predicates: ArrayContainer<Predicate<T>>, value: T): boolean {
  return predicates.every(predicate => predicate(value));
}

/**
 * Checks if a value satisfies all the given predicate functions
 *
 * @category Array
 * @param predicates - The array of predicate functions to test the value
 * @param value - The value to check
 * @returns Returns true if the value satisfies all predicates, false otherwise
 * @example
 * const predicates = [x => x > 0, x => x < 10];
 * allPass(predicates, 5); // true
 * allPass(predicates, 15); // false
 * allPass(predicates)(5); // true
 */
export const allPass = curry(allPassImpl) as {
  <T>(predicates: ArrayContainer<Predicate<T>>, value: T): boolean;
  <T1>(predicates: ArrayContainer<Predicate<T1>>): <T2 extends T1>(value: T2) => boolean;
};
