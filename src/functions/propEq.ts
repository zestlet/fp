import { curry } from './curry';
import { isEqual } from './isEqual';

function propEqImpl<V, K extends PropertyKey, T extends Record<PropertyKey, unknown>>(value: V, prop: K | keyof T, obj: T): boolean {
  return isEqual(obj[prop], value);
}

/**
 * Checks if the specified property of an object equals the given value
 *
 * @category Object
 * @param value - The value to compare against
 * @param prop - The property name to check
 * @param obj - The object to check
 * @returns Returns true if the property equals the value, false otherwise
 * @example
 * const user = { id: 1, name: 'Alice' };
 * propEq(1, 'id', user); // true
 * propEq('Bob', 'name', user); // false
 *
 * @example
 * // With currying
 * const isAdmin = propEq('admin', 'role');
 * isAdmin({ role: 'admin' }); // true
 * isAdmin({ role: 'user' }); // false
 */
export const propEq = curry(propEqImpl) as {
  <V, K extends PropertyKey, T extends Record<PropertyKey, unknown>>(value: V, prop: K | keyof T, obj: T): boolean;
  <V, K extends PropertyKey>(value: V, prop: K): <T extends Record<PropertyKey, unknown>>(obj: T) => boolean;
  <V>(value: V): {
    <K extends PropertyKey, T extends Record<K, unknown>>(prop: K | keyof T, obj: T): boolean;
    <K extends PropertyKey>(prop: K): <T extends Record<K, unknown>>(obj: T) => boolean;
  };
};
