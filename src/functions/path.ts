import { ArrayContainer } from '../shared/types/Array';

import { curry } from './curry';

export type GetPathValue<T, P extends readonly PropertyKey[], D = unknown> = P extends readonly []
  ? T
  : P extends readonly [infer Head, ...infer Tail extends readonly PropertyKey[]]
    ? Head extends keyof T
      ? GetPathValue<T[Head], Tail, D>
      : T extends readonly any[]
        ? Head extends number
          ? T[Head & number] extends infer ElementOrUndefined
            ? GetPathValue<ElementOrUndefined, Tail, D>
            : D
          : D
        : D
    : D;

function pathImpl<T, const P extends ArrayContainer<PropertyKey>, D>(path: P, obj: T): GetPathValue<T, P, D> {
  if (path.length === 0) return obj as GetPathValue<T, P, D>;
  if (obj == null) return undefined as GetPathValue<T, P, D>;

  const [head, ...tail] = path;
  if (!(head in (obj as object))) return undefined as GetPathValue<T, P, D>;

  const value = (obj as Record<PropertyKey, unknown>)[head];
  return pathImpl(tail, value) as GetPathValue<T, P, D>;
}

/**
 * Returns the value at a given path in a nested object
 *
 * @category Object
 * @param path - The path to the value
 * @param obj - The object to get the value from
 * @returns Returns the value at the path or undefined if the path doesn't exist
 * @example
 * const obj = { user: { name: 'John', address: { city: 'New York' } } };
 * path(['user', 'name'], obj); // 'John'
 * path(['user', 'address', 'city'])(obj); // 'New York'
 *
 * const obj2 = { '0': 'zero', [Symbol('test')]: 'symbol' };
 * path(['0'], obj2); // 'zero'
 * path([Symbol('test')], obj2); // 'symbol'
 */
export const path = curry(pathImpl) as {
  <T, const P extends ArrayContainer<PropertyKey>, D>(path: P, obj: T): GetPathValue<T, P, D>;
  <const P extends ArrayContainer<PropertyKey>>(path: P): <T, D>(obj: T) => GetPathValue<T, P, D>;
};
