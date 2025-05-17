import { ArrayContainer } from '../shared/types/Array';
import { curry } from './curry';

function pathEqImpl<const T, const P extends ArrayContainer<PropertyKey>, D>(value: D, path: P, obj: T): boolean {
  if (path.length === 0) return (value as any) === obj;
  if (obj == null) return false;

  const [head, ...tail] = path;
  if (!(head in (obj as object))) return false;

  const curValue = obj[head as keyof T];
  if (curValue === value) return true;
  return pathEqImpl(value, tail, curValue);
}

/**
 * Checks if the value at the specified path of an object equals the given value
 *
 * @category Object
 * @param value - The value to compare against
 * @param path - The path to check (array of keys)
 * @param obj - The object to check
 * @returns Returns true if the path value equals the value, false otherwise
 * @example
 * const user = {
 *   profile: {
 *     name: 'Alice',
 *     address: { city: 'New York' }
 *   }
 * };
 * pathEq('Alice', ['profile', 'name'], user); // true
 * pathEq('London', ['profile', 'address', 'city'], user); // false
 *
 * @example
 * // With currying
 * const isInNewYork = pathEq('New York', ['profile', 'address', 'city']);
 * isInNewYork(user); // true
 */
export const pathEq = curry(pathEqImpl) as {
  <const T, const P extends ArrayContainer<PropertyKey>, D>(value: D, path: P, obj: T): boolean;
  <const P extends ArrayContainer<PropertyKey>, D>(value: D, path: P): <const T>(obj: T) => boolean;
  <D>(value: D): {
    <const T, const P>(path: P, obj: T): boolean;
    <const P>(path: P): <const T>(obj: T) => boolean;
  };
};
