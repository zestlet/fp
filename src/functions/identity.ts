/**
 * Returns the value that was passed as the argument.
 * This function is useful as a default or placeholder function.
 *
 * @category Function
 * @param value The value to return
 * @returns The value that was passed as the argument
 * @example
 * identity(5) // 5
 * identity({ a: 1 }) // { a: 1 }
 */
function identityImpl<T>(value: T, ..._args: any[]): T {
  return value;
}

export const identity = identityImpl;
