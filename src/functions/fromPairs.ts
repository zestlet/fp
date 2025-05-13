type FromPairs<T extends readonly (readonly [PropertyKey, any])[]> = {
  [P in T[number] as P[0]]: P[1];
} & {};

type StrictPairs = readonly (readonly [PropertyKey, any])[];
type LoosePairs = unknown[][];
type LooseRecord<T> = Record<Extract<T, PropertyKey>, T>;

function fromPairsImpl<T extends StrictPairs | LoosePairs>(
  pairs: T
): T extends StrictPairs ? FromPairs<T> : LooseRecord<T[number][number]> {
  return Object.fromEntries(pairs) as any;
}

/**
 * Creates an object from an array of key-value pairs
 *
 * @category Array
 * @param pairs - The array of key-value pairs
 * @returns Returns an object created from the key-value pairs
 * @example
 * const pairs = [['a', 1], ['b', 2], ['c', 3]];
 * fromPairs(pairs); // { a: 1, b: 2, c: 3 }
 */
export const fromPairs = fromPairsImpl;
