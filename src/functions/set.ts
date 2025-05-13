import { curry } from './curry';

function setImpl<T extends Record<PropertyKey, unknown>, K extends PropertyKey, V>(
  key: K | keyof T,
  value: V | T[K],
  obj: T
): T & { [p in K]: V } {
  return { ...obj, [key]: value } as T & { [p in K]: V };
}

/**
 * Sets a property value on an object and returns a new object with the updated property
 *
 * @category Object
 * @param key - The property key to set
 * @param value - The value to set
 * @param obj - The object to set the property on
 * @returns Returns a new object with the updated property
 * @example
 * const obj = { name: 'John', age: 30 };
 * set('age', 31, obj); // { name: 'John', age: 31 }
 * set('age')(31)(obj); // { name: 'John', age: 31 }
 */
export const set = curry(setImpl) as {
  <T extends Record<PropertyKey, unknown>, const K extends PropertyKey, const V>(
    key: K | keyof T,
    value: V | T[K],
    obj: T
  ): T & { [p in K]: V };
  <T extends Record<PropertyKey, unknown>, const K extends PropertyKey, const V>(
    key: K | keyof T,
    value: V | T[K]
  ): <T2 extends T>(obj: T2) => T2 & { [p in K]: V };
  <T extends Record<PropertyKey, unknown>, const K extends PropertyKey>(
    key: K | keyof T
  ): {
    <T2 extends T, const V>(value: V | T2[K], obj: T2): T2 & { [p in K]: V };
    <const V>(value: V): <T2 extends T>(obj: T2) => T2 & { [p in K]: V };
  };
};
