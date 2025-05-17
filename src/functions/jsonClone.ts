function jsonCloneImpl<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/**
 * Creates a deep clone of a value using JSON serialization and deserialization
 *
 * @category Object
 * @param value - The value to clone
 * @returns A deep clone of the input value
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * const cloned = jsonClone(obj);
 * // cloned is a deep copy of obj
 *
 * @example
 * // Will throw an error due to circular reference
 * const obj = { a: 1 };
 * obj.self = obj;
 * jsonClone(obj); // Error: Converting circular structure to JSON
 *
 * @example
 * // Will throw an error due to BigInt
 * const obj = { a: 1n };
 * jsonClone(obj); // Error: BigInt value can't be serialized in JSON
 *
 * @example
 * // Will throw an error due to function
 * const obj = { a: () => {} };
 * jsonClone(obj); // Error: Function can't be serialized in JSON
 */
export const jsonClone = jsonCloneImpl;
