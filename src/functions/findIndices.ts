import { curry } from './curry';
import { ArrayContainer, ArrayPredicate } from '../shared/types/Array';

function findIndicesImpl<T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): number[] {
  return array.reduce<number[]>((indices, item, index, arr) => {
    if (predicate(item, index, arr)) {
      indices.push(index);
    }
    return indices;
  }, []);
}

/**
 * Returns an array of indices where the predicate function returns true
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param array - The array to search
 * @returns Returns an array of indices where the predicate function returns true
 * @example
 * const array = [1, 2, 3, 4, 5];
 * findIndices(x => x % 2 === 0, array); // [1, 3]
 * findIndices(x => x > 3)(array); // [3, 4]
 */
export const findIndices = curry(findIndicesImpl) as {
  <T>(predicate: ArrayPredicate<T>, array: ArrayContainer<T>): number[];
  <T>(predicate: ArrayPredicate<T>): (array: ArrayContainer<T>) => number[];
};
