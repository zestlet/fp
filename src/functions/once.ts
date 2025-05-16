/**
 * @category Function
 * @description Creates a function that is restricted to invoking func once. Repeat calls to the function return the value of the first invocation.
 * @example
 * ```typescript
 * const f = once((x: number) => x + 1)
 * f(1) // => 2
 * f(2) // => 2 (first result is cached)
 * ```
 */
export function once<T extends (...args: any[]) => any>(fn: T): T {
  let called = false;
  let result: ReturnType<T>;

  return ((...args: any[]): any => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  }) as T;
}
