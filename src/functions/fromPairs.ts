import { Prettify } from '../shared/types/Common';

type StrictPairs = readonly (readonly [PropertyKey, any])[];
type LoosePairs = unknown[][];

export type FromPairsStrict<T extends StrictPairs> = {
  [P in T[number] as P[0]]: P[1];
};
export type FromPairsLoose<T extends LoosePairs> = Record<Extract<T[number][number], PropertyKey>, T[number][number]>;

export type FromPairs<T extends StrictPairs | LoosePairs> = Prettify<
  T extends StrictPairs ? FromPairsStrict<T> : T extends LoosePairs ? FromPairsLoose<T> : never
>;

function fromPairsImpl<T extends StrictPairs | LoosePairs>(pairs: T): FromPairs<T> {
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
