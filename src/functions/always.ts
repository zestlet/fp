import { ConstantFunction } from '../shared/types/Function';

function alwaysImpl<T>(value: T): ConstantFunction<T> {
  return () => value;
}

/**
 * Returns a function that always returns the value that was passed as the argument.
 * This function is useful for creating constant functions.
 *
 * @category Function
 * @param value The value to always return
 * @returns A function that always returns the value
 * @example
 * const alwaysTrue = always(true);
 * alwaysTrue() // true
 * alwaysTrue('anything') // true
 */
export const always = alwaysImpl;
