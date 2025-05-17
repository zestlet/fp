import { curry } from './curry';

/**
 * Creates a function that applies multiple functions to the same arguments and then passes their results to a converging function
 *
 * @category Function
 * @param convergingFn - The function that receives the results of the branching functions
 * @param branchingFns - Array of functions that receive the same arguments
 * @returns Returns a new function that applies the branching functions to its arguments and passes their results to the converging function
 * @example
 * const add = (a: number, b: number) => a + b;
 * const multiply = (a: number, b: number) => a * b;
 * const subtract = (a: number, b: number) => a - b;
 *
 * const convergeFn = converge(
 *   (sum, product, diff) => sum + product + diff,
 *   [add, multiply, subtract]
 * );
 *
 * convergeFn(2, 3); // 11 (2+3 + 2*3 + 2-3)
 */
function convergeImpl<T extends any[], R>(convergingFn: (...args: any[]) => R, branchingFns: ((...args: T) => any)[]): (...args: T) => R {
  return (...args: T) => {
    const results = branchingFns.map(fn => fn(...args));
    return convergingFn(...results);
  };
}

export const converge = curry(convergeImpl) as {
  <T extends any[], R>(convergingFn: (...args: any[]) => R, branchingFns: ((...args: T) => any)[]): (...args: T) => R;
  <T extends any[], R>(convergingFn: (...args: any[]) => R): (branchingFns: ((...args: T) => any)[]) => (...args: T) => R;
};
