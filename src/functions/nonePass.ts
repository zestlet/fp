import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function nonePassImpl<T>(predicates: ArrayContainer<ArrayCallback<T, boolean>>, value: T): boolean {
  if (predicates.length === 0) return true;
  return !predicates.some(predicate => predicate(value, 0, [value]));
}

/**
 * Checks if none of the predicates return true for the given value
 *
 * @category Array
 * @param predicates - The array of predicate functions to test
 * @param value - The value to test against the predicates
 * @returns Returns true if none of the predicates return true, false otherwise
 * @example
 * const isEven = (x: number) => x % 2 === 0;
 * const isPositive = (x: number) => x > 0;
 * nonePass([isEven, isPositive], -1); // false
 * nonePass([isEven, isPositive])(-1); // false
 */
export const nonePass = curry(nonePassImpl) as {
  <T>(predicates: ArrayContainer<ArrayCallback<T, boolean>>, value: T): boolean;
  <T>(predicates: ArrayContainer<ArrayCallback<T, boolean>>): <T2 extends T>(value: T2) => boolean;
};
