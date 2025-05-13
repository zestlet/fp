import { curry } from './curry';

type UnfoldFn<T, R> = (value: T) => [R, T] | false;

function unfoldImpl<T, R>(fn: UnfoldFn<T, R>, seed: T): R[] {
  const result: R[] = [];
  let current = seed;

  while (true) {
    const next = fn(current);
    if (!next) break;
    const [value, newSeed] = next;
    result.push(value);
    current = newSeed;
  }

  return result;
}

/**
 * Builds a list from a seed value using an iterator function
 *
 * @category Array
 * @param fn - The iterator function that returns [value, newSeed] or false to stop
 * @param seed - The initial seed value
 * @returns Returns a list generated from the seed value
 * @example
 * const fn = (n: number) => n < 5 ? [n, n + 1] : false;
 * unfold(fn, 0); // [0, 1, 2, 3, 4]
 */
export const unfold = curry(unfoldImpl) as {
  <T, R>(fn: UnfoldFn<T, R>, seed: T): R[];
  <T, R>(fn: UnfoldFn<T, R>): <T2 extends T>(seed: T2) => R[];
};
