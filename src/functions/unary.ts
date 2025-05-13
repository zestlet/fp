/**
 * Wraps a function of any arity (including nullary) in a function that accepts exactly 1 parameter.
 * Any extraneous parameters will not be passed to the supplied function.
 *
 * @category Function
 * @param fn The function to wrap
 * @returns A new function that accepts exactly one parameter
 * @example
 * const fn = (a: number, b: number) => a + (b ?? 0);
 * const unaryFn = unary(fn);
 * unaryFn(1, 2, 3) // 1
 */
function unaryImpl<T, R>(fn: (...args: any[]) => R): (arg: T) => R {
  return (arg: T) => fn(arg);
}

export const unary = unaryImpl;
