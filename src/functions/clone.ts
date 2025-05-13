function cloneImpl<T extends Record<PropertyKey, unknown>>(obj: T): T {
  return { ...obj };
}

/**
 * Creates a shallow copy of an object
 *
 * @category Object
 * @param obj - The object to clone
 * @returns Returns a new object with the same properties as the input object
 * @example
 * const obj = { name: 'John', age: 30 };
 * const cloned = clone(obj);
 * cloned === obj; // false
 * cloned.name === obj.name; // true
 */
export const clone = cloneImpl;
