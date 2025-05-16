// type ObjectEntries<T> = Prettify<
//   {
//     [K in keyof T]: [K, T[K]];
//   }[keyof T][]
// >;

type ObjectEntriesWithOptional<T> = {
  [K in keyof T]-?: [K, T[K] extends undefined ? undefined : T[K]];
}[keyof T][];

function toPairsImpl<const T extends Record<PropertyKey, any>>(obj: T): ObjectEntriesWithOptional<T> {
  return Object.entries(obj);
}

/**
 * Converts an object into an array of key-value pairs
 *
 * @category Array
 * @param obj - The object to convert
 * @returns Returns an array of key-value pairs
 * @example
 * const obj = { a: 1, b: 2, c: 3 };
 * toPairs(obj); // [['a', 1], ['b', 2], ['c', 3]]
 */
export const toPairs = toPairsImpl;
