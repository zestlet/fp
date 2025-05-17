import { DeepPartial } from '../shared/types/Object';
import { curry } from './curry';

type Predicate<T, K extends PropertyKey, O extends Record<K, unknown>> = (value: T, key: K, obj: O) => boolean;

function whereAnyImpl<S extends Record<PropertyKey, unknown>>(
  predicates: { [K in keyof S]?: Predicate<S[K], K, S> },
  obj: DeepPartial<S> | Record<PropertyKey, unknown>
): boolean {
  for (const key in predicates) {
    const predicate = predicates[key];
    if (predicate && predicate(obj[key] as S[typeof key], key, obj as S)) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if an object satisfies any predicate in the spec object
 *
 * @category Object
 * @param predicates - The specification object containing predicate functions
 * @param obj - The object to check
 * @returns Returns true if the object satisfies any predicate, false otherwise
 * @example
 * const predicates = {
 *   name: (x: string) => x.length > 0,
 *   age: (x: number) => x >= 18
 * };
 * whereAny(predicates, { name: '', age: 20 }); // true
 * whereAny(predicates, { name: '', age: 16 }); // false
 *
 * @example
 * // With currying
 * const hasValidNameOrAge = whereAny({
 *   name: (x: string) => x.length > 0,
 *   age: (x: number) => x >= 18
 * });
 * hasValidNameOrAge({ name: '', age: 20 }); // true
 * hasValidNameOrAge({ name: '', age: 16 }); // false
 */
export const whereAny = curry(whereAnyImpl) as {
  <S extends Record<PropertyKey, unknown>>(
    predicates: { [K in keyof S]?: Predicate<S[K], K, S> },
    obj: DeepPartial<S> | Record<PropertyKey, unknown>
  ): boolean;
  <S extends Record<PropertyKey, unknown>>(predicates: { [K in keyof S]?: Predicate<S[K], K, S> }): (
    obj: DeepPartial<S> | Record<PropertyKey, unknown>
  ) => boolean;
};
