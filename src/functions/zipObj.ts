import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

function zipObjImpl<const K extends PropertyKey, const V>(keys: ArrayContainer<K>, values: ArrayContainer<V>): Record<K, V> {
  return keys.reduce(
    (acc, key, index) => {
      if (index < values.length) {
        acc[key] = values[index];
      }
      return acc;
    },
    {} as Record<K, V>
  );
}

/**
 * Creates an object from two arrays, using the first array as keys and the second array as values
 *
 * @category Array
 * @param keys - The array of keys
 * @param values - The array of values
 * @returns Returns an object with keys from the first array and values from the second array
 * @example
 * const keys = ['a', 'b', 'c'];
 * const values = [1, 2, 3];
 * zipObj(keys, values); // { a: 1, b: 2, c: 3 }
 * zipObj(keys)(values); // { a: 1, b: 2, c: 3 }
 */
export const zipObj = curry(zipObjImpl) as {
  <const K extends PropertyKey, const V>(keys: ArrayContainer<K>, values: ArrayContainer<V>): Record<K, V>;
  <const K extends PropertyKey>(keys: ArrayContainer<K>): <const V>(values: ArrayContainer<V>) => Record<K, V>;
};
