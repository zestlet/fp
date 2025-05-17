import { DeepPartial } from '../shared/types/Object';
import { curry } from './curry';
import { isEqual } from './isEqual';

function whereEqImpl<S extends Record<PropertyKey, unknown>>(spec: S, obj: DeepPartial<S> | Record<PropertyKey, unknown>): boolean {
  for (const key in spec) {
    if (!isEqual(spec[key], obj[key])) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if an object satisfies all property equality assertions in the spec object
 *
 * @category Object
 * @param spec - The specification object containing property equality assertions
 * @param obj - The object to check
 * @returns Returns true if the object satisfies all property equality assertions, false otherwise
 * @example
 * const spec = { name: 'Alice', age: 20 };
 * whereEq(spec, { name: 'Alice', age: 20, role: 'admin' }); // true
 * whereEq(spec, { name: 'Bob', age: 20 }); // false
 *
 * @example
 * // With currying
 * const isAlice = whereEq({ name: 'Alice' });
 * isAlice({ name: 'Alice', age: 20 }); // true
 * isAlice({ name: 'Bob', age: 20 }); // false
 */
export const whereEq = curry(whereEqImpl) as {
  <S extends Record<PropertyKey, unknown>>(spec: S, obj: DeepPartial<S> | Record<PropertyKey, unknown>): boolean;
  <S extends Record<PropertyKey, unknown>>(spec: S): (obj: DeepPartial<S> | Record<PropertyKey, unknown>) => boolean;
};
