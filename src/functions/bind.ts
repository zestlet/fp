import { curry } from './curry';

/**
 * Binds a function to a specific this context
 *
 * @category Function
 * @param fn - The function to bind
 * @param thisArg - The value to be used as this when calling the function
 * @returns Returns a new function with the specified this context
 * @example
 * const obj = { value: 42 };
 * const getValue = function() { return this.value; };
 * const boundGetValue = bind(getValue, obj);
 * boundGetValue(); // 42
 */
function bindImpl<T extends (...args: any[]) => any, This>(fn: T, thisArg: This): (...args: Parameters<T>) => ReturnType<T> {
  return fn.bind(thisArg);
}

export const bind = curry(bindImpl) as {
  <T extends (...args: any[]) => any, This>(fn: T, thisArg: This): (...args: Parameters<T>) => ReturnType<T>;
  <T extends (...args: any[]) => any>(fn: T): <This>(thisArg: This) => (...args: Parameters<T>) => ReturnType<T>;
};
