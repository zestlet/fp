import { curry } from './curry';

/**
 * Executes a function with the value as an argument and returns the value.
 * This function is useful for performing side effects in a functional pipeline.
 *
 * @category Function
 * @param fn The function to execute
 * @param value The value to pass to the function
 * @returns The original value
 * @example
 * tap(console.log, 5) // logs 5, returns 5
 * tap(x => x.push(4), [1, 2, 3]) // returns [1, 2, 3, 4]
 */
function tapImpl<T>(fn: (value: T) => void, value: T): T {
  fn(value);
  return value;
}

export const tap = curry(tapImpl) as {
  <T>(fn: (value: T) => void, value: T): T;
  <T>(fn: (value: T) => void): <T2 extends T>(value: T2) => T2;
};
