import { curry } from './curry';

function propOrImpl<T extends Record<PropertyKey, unknown>, K extends keyof T, D>(defaultValue: D, key: K, obj: T): T[K] | D {
  if (obj === null || obj === undefined) {
    return defaultValue;
  }
  return Object.prototype.hasOwnProperty.call(obj, key) ? obj[key] : defaultValue;
}

/**
 * Returns the value of a property from an object, or a default value if the property doesn't exist
 *
 * @category Object
 * @param defaultValue - The default value to return if the property doesn't exist
 * @param key - The property key to get
 * @param obj - The object to get the property from
 * @returns Returns the value of the property or the default value
 * @example
 * const obj = { name: 'John', age: 30 };
 * propOr('Unknown', 'name', obj); // 'John'
 * propOr(0, 'age')(obj); // 30
 * propOr('Unknown', 'address')(obj); // 'Unknown'
 */
export const propOr = curry(propOrImpl) as {
  <T extends Record<PropertyKey, unknown>, K extends keyof T = keyof T, D = unknown>(defaultValue: D, key: K, obj: T): T[K] | D;
  <T extends Record<PropertyKey, unknown>, K extends keyof T = keyof T, D = unknown>(defaultValue: D, key: K): (obj: T) => T[K] | D;
  <T extends Record<PropertyKey, unknown>, K extends keyof T = keyof T, D = unknown>(
    defaultValue: D
  ): {
    (key: K, obj: T): T[K] | D;
    (key: K): (obj: T) => T[K] | D;
  };
};
