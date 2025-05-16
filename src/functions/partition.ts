import { curry } from './curry';

function partitionImpl<T extends object, K extends keyof T>(pickProps: readonly K[], obj: T): [Pick<T, K>, Omit<T, K>] {
  const picked = {} as Pick<T, K>;
  const omitted = { ...obj } as T;

  for (const key of pickProps) {
    if (key in obj) {
      picked[key] = obj[key];
      delete omitted[key];
    }
  }

  return [picked, omitted as Omit<T, K>];
}

/**
 * Splits an object into two parts based on the specified property list
 * @category Object
 * @param {readonly PropertyKey[]} pickProps - List of properties to keep
 * @param {T} obj - Object to split
 * @returns {[Pick<T, K>, Omit<T, K>]} A tuple containing two objects, first with picked properties, second with omitted properties
 * @example
 * ```ts
 * const obj = { a: 1, b: 2, c: 3 };
 * const [picked, omitted] = partition(['a', 'b'], obj);
 * // picked = { a: 1, b: 2 }
 * // omitted = { c: 3 }
 * ```
 */
export const partition = curry(partitionImpl) as {
  <T extends object, K extends keyof T>(pickProps: readonly K[], obj: T): [Pick<T, K>, Omit<T, K>];
  <K extends PropertyKey>(pickProps: readonly K[]): <T extends object & { [P in K]?: any }>(obj: T) => [Pick<T, K>, Omit<T, K>];
};
