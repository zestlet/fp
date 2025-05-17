import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function includesByImpl<T, R>(fn: ArrayCallback<T, unknown>, value: R, array: ArrayContainer<T>): boolean {
  for (let i = 0; i < array.length; i++) {
    if (fn(array[i], i, array) === value) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if an array includes an element that, when transformed by the given function, equals the specified value
 *
 * @category Array
 * @param fn - The function to transform each element
 * @param value - The value to compare against
 * @param array - The array to check
 * @returns Returns true if any element's transformed value equals the specified value, false otherwise
 * @example
 * const array = [1, 2, 3, 4, 5];
 * includesBy(x => x * 2, 6, array); // true (because 3 * 2 === 6)
 * includesBy(x => x * 2, 11, array); // false
 *
 * const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
 * includesBy(user => user.name, 'Alice', users); // true
 * includesBy(user => user.name, 'Charlie', users); // false
 */
export const includesBy = curry(includesByImpl) as {
  <T, R>(fn: ArrayCallback<T, unknown>, value: R, array: ArrayContainer<T>): boolean;
  <T, R>(fn: ArrayCallback<T, unknown>, value: R): (array: ArrayContainer<T>) => boolean;
  <T>(fn: ArrayCallback<T, unknown>): {
    <R>(value: R, array: ArrayContainer<T>): boolean;
    <R>(value: R): (array: ArrayContainer<T>) => boolean;
  };
};
