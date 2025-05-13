import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function minByImpl<T, I>(fn: (value: T) => I, array: ArrayContainer<T>): T | undefined {
  if (array.length === 0) return undefined;
  return array.reduce((min, current) => (fn(current) < fn(min) ? current : min));
}

/**
 * Finds the minimum value in an array by applying a function to each element
 *
 * @category Array
 * @param fn - The function to apply to each element
 * @param array - The array to process
 * @returns Returns the element with the minimum value, or undefined if the array is empty
 * @example
 * const array = [{ value: 1 }, { value: 2 }, { value: 3 }];
 * minBy(item => item.value, array); // => { value: 1 }
 * minBy(item => item.value * 2)(array); // => { value: 1 }
 */
export const minBy = curry(minByImpl) as {
  <T, I>(fn: (value: T) => I, array: ArrayContainer<T>): T | undefined;
  <T, I>(fn: (value: T) => I): <T2 extends T>(array: ArrayContainer<T2>) => T2 | undefined;
};
