function keysImpl<T extends string | number>(obj: Record<T, unknown>): `${T}`[] {
  return Object.keys(obj) as `${T}`[];
}

/**
 * Returns an array of all enumerable and non-enumerable keys of an object
 *
 * @category Object
 * @param obj - The object to get keys from
 * @returns Returns an array of all keys
 * @example
 * const obj = { name: 'John', age: 30 };
 * keys(obj); // ['name', 'age']
 *
 * const sym = Symbol('sym');
 * const objWithSymbol = { [sym]: 'value', name: 'John' };
 * keys(objWithSymbol); // ['name', Symbol(sym)]
 */
export const keys = keysImpl;
