import { curry } from './curry';

function pickImpl<T extends Record<PropertyKey, any>, K extends PropertyKey>(keys: readonly (K | keyof T)[], obj: T): Pick<T, K> {
  return keys.reduce(
    (acc, key) => {
      if (key in obj) {
        acc[key as keyof Pick<T, K>] = obj[key] as Pick<T, K>[keyof Pick<T, K>];
      }
      return acc;
    },
    {} as Pick<T, K>
  );
}

/**
 * Creates a new object with only the specified properties
 *
 * @category Object
 * @param keys - The array of property keys to pick
 * @param obj - The object to pick properties from
 * @returns Returns a new object with only the specified properties
 * @example
 * const obj = { name: 'John', age: 30, city: 'New York' };
 * pick(['name', 'age'], obj); // { name: 'John', age: 30 }
 * pick(['name'])(obj); // { name: 'John' }
 */
export const pick = curry(pickImpl) as {
  <T extends Record<PropertyKey, any>, K extends PropertyKey>(keys: readonly (K | keyof T)[], obj: T): Pick<T, K>;
  <T extends Record<PropertyKey, any>, K extends PropertyKey>(keys: readonly (K | keyof T)[]): <T2 extends T>(obj: T2) => Pick<T2, K>;
};
