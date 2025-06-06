import { curry } from './curry';

function timesImpl<T>(callback: (index: number) => T, count: number): T[] {
  return Array.from({ length: count }, (_, index) => callback(index));
}

/**
 * Creates an array of values by calling the callback function count times
 *
 * @category Array
 * @param callback - The function to call for each index
 * @param count - The number of times to call the callback
 * @returns Returns an array of values generated by the callback
 * @example
 * times(index => index * 2, 3); // [0, 2, 4]
 * times(() => Math.random(), 2); // [0.123, 0.456]
 * times(index => ({ id: index }), 2); // [{ id: 0 }, { id: 1 }]
 */
export const times = curry(timesImpl) as {
  <T>(callback: (index: number) => T, count: number): T[];
  <T>(callback: (index: number) => T): (count: number) => T[];
};
