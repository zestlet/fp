import { DeepPartial } from '../shared/types/Object';
import { curry } from './curry';

type Predicate<T, K extends PropertyKey, O extends Record<K, unknown>> = (value: T, key: K, obj: O) => boolean;

function whereImpl<S extends Record<PropertyKey, unknown>>(
  predicates: { [K in keyof S]?: Predicate<S[K], K, S> },
  obj: DeepPartial<S> | Record<PropertyKey, unknown>
): boolean {
  for (const key in predicates) {
    const predicate = predicates[key];
    if (predicate && !predicate(obj[key] as S[typeof key], key, obj as S)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if an object satisfies all predicates in the spec object
 *
 * @category Object
 * @param predicates - The specification object containing predicate functions
 * @param obj - The object to check
 * @returns Returns true if the object satisfies all predicates, false otherwise
 * @example
 * const predicates = {
 *   name: (x: string) => x.length > 0,
 *   age: (x: number) => x >= 18
 * };
 * where(predicates, { name: 'Alice', age: 20 }); // true
 * where(predicates, { name: '', age: 16 }); // false
 *
 * @example
 * // With currying
 * const isAdult = where({ age: (x: number) => x >= 18 });
 * isAdult({ name: 'Alice', age: 20 }); // true
 * isAdult({ name: 'Bob', age: 16 }); // false
 */
export const where = curry(whereImpl) as {
  <S extends Record<PropertyKey, unknown>>(
    predicates: { [K in keyof S]?: Predicate<S[K], K, S> },
    obj: DeepPartial<S> | Record<PropertyKey, unknown>
  ): boolean;
  <S extends Record<PropertyKey, unknown>>(predicates: { [K in keyof S]?: Predicate<S[K], K, S> }): (
    obj: DeepPartial<S> | Record<PropertyKey, unknown>
  ) => boolean;
};
