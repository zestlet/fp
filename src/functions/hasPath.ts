import { curry } from './curry';

function hasPathImpl(path: PropertyKey[], obj: Record<PropertyKey, unknown>): boolean {
  if (!path.length) return true;
  if (!obj || typeof obj !== 'object') return false;

  let current: any = obj;
  for (const key of path) {
    if (!(key in current)) return false;
    current = current[key];
    if (current === null || current === undefined) return false;
  }
  return true;
}

/**
 * Checks if an object has a specified path
 *
 * @category Object
 * @param path - The path to check, can be an array of keys or a dot-separated string
 * @param obj - The object to check
 * @returns Returns true if the path exists in the object, false otherwise
 * @example
 * const obj = { a: { b: { c: 1 } } };
 * hasPath(['a', 'b', 'c'], obj); // true
 * hasPath(['a', 'b', 'd'], obj); // false
 * hasPath('a.b.c', obj); // true
 *
 * @example
 * // With currying
 * const hasUserProfile = hasPath(['user', 'profile']);
 * hasUserProfile({ user: { profile: { name: 'Alice' } } }); // true
 * hasUserProfile({ user: { settings: {} } }); // false
 */
export const hasPath = curry(hasPathImpl) as {
  (path: PropertyKey[], obj: Record<PropertyKey, unknown>): boolean;
  (path: PropertyKey[]): (obj: Record<PropertyKey, unknown>) => boolean;
};
