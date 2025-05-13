import { curry } from './curry';

function repeatImpl<T>(value: T, count: number): T[] {
  return Array.from({ length: count }, () => value);
}

/**
 * Creates an array with the specified value repeated count times
 *
 * @category Array
 * @param value - The value to repeat
 * @param count - The number of times to repeat the value
 * @returns Returns an array with the value repeated count times
 * @example
 * repeat('a', 3); // ['a', 'a', 'a']
 * repeat(42, 2); // [42, 42]
 * repeat({ id: 1 }, 2); // [{ id: 1 }, { id: 1 }]
 * repeat('a')(3); // ['a', 'a', 'a']
 */
export const repeat = curry(repeatImpl) as {
  <T>(value: T, count: number): T[];
  <T>(value: T): (count: number) => T[];
};
