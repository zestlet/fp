function complementImpl<T extends readonly any[], R>(fn: (...args: T) => R): (...args: T) => boolean {
  return (...args: T) => !fn(...args);
}

/**
 * Returns a function that returns the logical complement of the result of the given function.
 * The given function must be a predicate function (returning a boolean value).
 *
 * @category Function
 * @param fn The predicate function to complement
 * @returns A new function that returns the logical complement of the result
 * @example
 * const isEven = (n: number) => n % 2 === 0;
 * const isOdd = complement(isEven);
 * isEven(2) // true
 * isOdd(2) // false
 */
export const complement = complementImpl;
