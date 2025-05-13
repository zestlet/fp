import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
import { ArrayFlatten } from '../shared/types/ArrayFlatten';

function flattenImpl<T, Depth extends number>(n: Depth, array: ArrayContainer<T>): ArrayFlatten<T, Depth> {
  return array.flat(n) as ArrayFlatten<T, Depth>;
}

/**
 * Flattens an array up to the specified depth
 *
 * @category Array
 * @param n - The depth level specifying how deep a nested array structure should be flattened
 * @param array - The array to flatten
 * @returns Returns the new flattened array
 * @example
 * const array = [1, [2, [3, [4]], 5]];
 * flatten(1, array); // [1, 2, [3, [4]], 5]
 * flatten(2, array); // [1, 2, 3, [4], 5]
 * flatten(1)(array); // [1, 2, [3, [4]], 5]
 */
export const flatten = curry(flattenImpl) as {
  <T, Depth extends number>(n: Depth, array: ArrayContainer<T>): ArrayFlatten<T, Depth>;
  <T, Depth extends number>(n: Depth): (array: ArrayContainer<T>) => ArrayFlatten<T, Depth>;
};
