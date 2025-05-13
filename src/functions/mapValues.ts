import { curry } from './curry';

function mapValuesImpl<T extends PropertyKey, U, R>(fn: (value: U, key: T, obj: Record<T, U>) => R, obj: Record<T, U>): Record<T, R> {
  const result = {} as Record<T, R>;

  Object.entries(obj).forEach(([key, value]) => {
    result[key as T] = fn(value as U, key as T, obj);
  });

  return result;
}

/**
 * Transforms object values using a mapping function
 *
 * @category Object
 * @param fn - The function to transform values
 * @param obj - The object to transform
 * @returns Returns a new object with transformed values
 * @example
 * const obj = { name: 'John', age: 30 };
 * mapValues(value => value.toString(), obj); // { name: 'John', age: '30' }
 * mapValues((value, key) => `${key}: ${value}`)(obj); // { name: 'name: John', age: 'age: 30' }
 */
export const mapValues = curry(mapValuesImpl) as {
  <T extends PropertyKey, U, R>(fn: (value: U, key: T, obj: Record<T, U>) => R, obj: Record<T, U>): Record<T, R>;
  <T extends PropertyKey, U, R>(
    fn: (value: U, key: T, obj: Record<T, U>) => R
  ): <T2 extends T, U2 extends U>(obj: Record<T2, U2>) => Record<T, R>;
};
