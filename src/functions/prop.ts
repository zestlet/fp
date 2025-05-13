import { curry } from './curry';

function propImpl<T extends Record<PropertyKey, unknown>, const K extends keyof T>(key: K, obj: T): T[K] {
  return obj[key];
}

/**
 * Returns the value of a property from an object
 *
 * @category Object
 * @param key - The property key to get
 * @param obj - The object to get the property from
 * @returns Returns the value of the property
 * @example
 * const obj = { name: 'John', age: 30 };
 * prop('name', obj); // 'John'
 * prop('age')(obj); // 30
 */
export const prop = curry(propImpl) as {
  <T, const K extends keyof T>(key: K, obj: T): T[K];
  <const K extends PropertyKey>(key: K): <T, K2 extends keyof T & K>(obj: T) => T[K2];
};

// strict version
// interface Prop<T, K> {
//   (key: K, obj: T): K extends keyof T ? T[K] : never;
//   (key: K, ...args: any[]): <T2 extends T>(obj: T2) => K extends keyof T2 ? T2[K] : never;
// }

// export const prop = curry(propImpl) as { <T, K>(...[k, o]: Parameters<Prop<T, K>>): ReturnType<Prop<T, K>> };
