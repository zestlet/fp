import { curry } from './curry';

function mapEntriesImpl<T extends PropertyKey, U, R extends PropertyKey, V>(
  fn: (entry: [T, U], obj: Record<T, U>) => [R, V],
  obj: Record<T, U>
): Record<R, V> {
  const result = {} as Record<R, V>;

  Object.entries(obj).forEach(([key, value]) => {
    const [newKey, newValue] = fn([key as T, value as U], obj);
    result[newKey] = newValue;
  });

  return result;
}

/**
 * Transforms object entries using a mapping function
 *
 * @category Object
 * @param fn - The function to transform entries
 * @param obj - The object to transform
 * @returns Returns a new object with transformed entries
 * @example
 * const obj = { name: 'John', age: 30 };
 * mapEntries(([key, value]) => [`user_${key}`, value.toString()], obj);
 * // { user_name: 'John', user_age: '30' }
 * mapEntries(([key, value]) => [key.toUpperCase(), value])(obj);
 * // { NAME: 'John', AGE: 30 }
 */
export const mapEntries = curry(mapEntriesImpl) as {
  <T extends PropertyKey, U, R extends PropertyKey, V>(fn: (entry: [T, U], obj: Record<T, U>) => [R, V], obj: Record<T, U>): Record<R, V>;
  <K extends PropertyKey, V, R extends PropertyKey, U>(
    fn: (entry: readonly [K, V], obj: Record<K, V>) => readonly [R, U]
  ): (obj: Record<K & PropertyKey, V>) => Record<R, U>;
};
