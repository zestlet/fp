/**
 * Returns a no-operation function.
 * This function is useful as a default or placeholder function.
 *
 * @category Function
 * @returns A function that does nothing
 * @example
 * noop() // undefined
 * noop(1, 2, 3) // undefined
 */
export function noop(..._args: any[]): void {
  return;
}
