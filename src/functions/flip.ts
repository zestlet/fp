/**
 * Returns a new function that takes the first two arguments in reverse order.
 * Any additional arguments will be passed in their original order.
 *
 * @category Function
 * @param fn The function to flip
 * @returns A new function with the first two arguments flipped
 * @example
 * const subtract = (a: number, b: number) => a - b;
 * const flippedSubtract = flip(subtract);
 * subtract(5, 3) // 2
 * flippedSubtract(5, 3) // -2
 */
function flipImpl<T, U, R>(fn: (a: T, b: U, ...args: any[]) => R): (b: U, a: T, ...args: any[]) => R {
  return (b: U, a: T, ...args: any[]) => fn(a, b, ...args);
}

export const flip = flipImpl;
