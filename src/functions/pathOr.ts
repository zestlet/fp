import { ArrayContainer } from '../shared/types/Array';
import { PathValue } from '../shared/types/Object';
import { curry } from './curry';

function pathOrImpl<T, const P extends ArrayContainer<PropertyKey>, D>(defaultValue: D, path: P, obj: T): PathValue<T, P, D> {
  if (path.length === 0) return obj as PathValue<T, P, D>;
  if (obj == null) return defaultValue as PathValue<T, P, D>;

  const [head, ...tail] = path;
  if (!(head in (obj as object))) return defaultValue as PathValue<T, P, D>;

  const value = (obj as Record<PropertyKey, unknown>)[head];
  return pathOrImpl(defaultValue, tail, value) as PathValue<T, P, D>;
}

/**
 * Returns the value at a given path in a nested object, or a default value if the path doesn't exist
 *
 * @category Object
 * @param defaultValue - The default value to return if the path doesn't exist
 * @param path - The path to the value
 * @param obj - The object to get the value from
 * @returns Returns the value at the path or the default value
 * @example
 * const obj = { user: { name: 'John', address: { city: 'New York' } } };
 * pathOr('Unknown', ['user', 'name'], obj); // 'John'
 * pathOr('Unknown', ['user', 'age'])(obj); // 'Unknown'
 * pathOr('Unknown', ['user', 'address', 'city'])(obj); // 'New York'
 */
export const pathOr = curry(pathOrImpl) as {
  <const T, const P extends ArrayContainer<PropertyKey>, D>(defaultValue: D, path: P, obj: T): PathValue<T, P, D>;
  <const T, const P extends ArrayContainer<PropertyKey>, D>(defaultValue: D, path: P): <T2 extends T>(obj: T2) => PathValue<T2, P, D>;
  <const T, const P extends ArrayContainer<PropertyKey>, D>(
    defaultValue: D
  ): {
    <const T2 extends T>(path: P, obj: T2): PathValue<T2, P, D>;
    <const P2 extends P>(path: P2): <const T2 extends T>(obj: T2) => PathValue<T2, P2, D>;
  };
};
