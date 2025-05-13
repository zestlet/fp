import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function intersperseImpl<T, S>(value: S, array: ArrayContainer<T>): (T | S)[] {
  const length = array.length;

  if (length <= 1) return [...array];

  const result: (T | S)[] = [];
  for (let i = 0; i < length - 1; i++) {
    result.push(array[i]);
    result.push(value);
  }
  result.push(array[length - 1]);

  return result;
}

/**
 * Inserts a value between each element of an array
 *
 * @category Array
 * @param value - The value to insert between elements
 * @param array - The array to intersperse
 * @returns Returns a new array with the value inserted between elements
 * @example
 * const array = [1, 2, 3];
 * intersperse(0, array); // [1, 0, 2, 0, 3]
 * intersperse(0)(array); // [1, 0, 2, 0, 3]
 */
export const intersperse = curry(intersperseImpl) as {
  <T, S>(value: S, array: ArrayContainer<T>): (T | S)[];
  <T, S>(value: S): <T2 extends T>(array: ArrayContainer<T2>) => (T2 | S)[];
};
