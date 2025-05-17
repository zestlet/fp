import { curry } from './curry';

/**
 * Calls a function with the given arguments
 *
 * @category Function
 * @param fn - The function to call
 * @param args - The arguments to pass to the function
 * @returns Returns the result of calling the function with the given arguments
 * @example
 * const add = (a: number, b: number) => a + b;
 * call(add, 1, 2); // 3
 *
 * const greet = (name: string, greeting: string) => `${greeting}, ${name}!`;
 * call(greet, 'Alice', 'Hello'); // 'Hello, Alice!'
 */
function callImpl<T extends any[], R>(fn: (...args: T) => R, args: T): R {
  return fn.apply(null, args);
}

export const call = curry(callImpl) as {
  <T extends any[], R>(fn: (...args: T) => R, args: T): R;
  <T extends any[], R>(fn: (...args: T) => R): (args: T) => R;
};
