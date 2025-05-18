import { curry } from './curry';

function omitImpl<T extends Record<PropertyKey, any>, K extends PropertyKey>(keys: readonly (K | keyof T)[], obj: T): Omit<T, K> {
  const keySet = new Set(keys);
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      if (!keySet.has(key as K)) {
        acc[key as keyof Omit<T, K>] = value as Omit<T, K>[keyof Omit<T, K>];
      }
      return acc;
    },
    {} as Omit<T, K>
  );
}

/**
 * Creates a new object without the specified properties
 *
 * @category Object
 * @param keys - The array of property keys to omit
 * @param obj - The object to omit properties from
 * @returns Returns a new object without the specified properties
 * @example
 * const obj = { name: 'John', age: 30, city: 'New York' };
 * omit(['age'], obj); // { name: 'John', city: 'New York' }
 * omit(['name', 'city'])(obj); // { age: 30 }
 */
export const omit = curry(omitImpl) as {
  <T extends Record<PropertyKey, any>, K extends PropertyKey>(keys: readonly (K | keyof T)[], obj: T): Omit<T, K>;
  <T extends Record<PropertyKey, any>, K extends PropertyKey>(keys: readonly (K | keyof T)[]): <T2 extends T>(obj: T2) => Omit<T2, K>;
};
