import { curry } from './curry';

function hasImpl<T, K extends keyof T>(prop: K, obj: T): boolean {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/**
 * Checks if an object has a specific property
 *
 * @category Object
 * @param prop - The property to check for
 * @param obj - The object to check
 * @returns Returns true if the object has the property, false otherwise
 * @example
 * const obj = { name: 'John', age: 30 };
 * has('name', obj); // true
 * has('address', obj); // false
 *
 * const sym = Symbol('sym');
 * const objWithSymbol = { [sym]: 'value' };
 * has(sym, objWithSymbol); // true
 */
export const has = curry(hasImpl) as {
  <T, K>(prop: unknown, obj: T): K extends keyof T ? true : false;
  <K extends PropertyKey>(prop: K): <T>(obj: T) => K extends keyof T ? true : false;
};
