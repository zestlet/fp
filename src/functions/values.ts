function valuesImpl<T extends Record<PropertyKey, unknown>>(obj: T): Array<T[keyof T]> {
  return [...Object.values(obj), ...Object.getOwnPropertySymbols(obj).map(sym => obj[sym])] as Array<T[keyof T]>;
}

/**
 * Returns an array of all enumerable and non-enumerable values of an object
 *
 * @category Object
 * @param obj - The object to get values from
 * @returns Returns an array of all values
 * @example
 * const obj = { name: 'John', age: 30 };
 * values(obj); // ['John', 30]
 *
 * const sym = Symbol('sym');
 * const objWithSymbol = { [sym]: 'value', name: 'John' };
 * values(objWithSymbol); // ['John', 'value']
 */
export const values = valuesImpl;
