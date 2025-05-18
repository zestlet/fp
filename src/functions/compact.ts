import { ArrayContainer } from '../shared/types/Array';

/**
 * Constant array containing all falsy values
 */
export const FALSY_VALUES = [false, null, 0, -0, 0n, '', undefined, NaN] as const;
type FALSY_VALUES_SAFE = false | null | 0 | '' | undefined | 0n;
type Compact<T extends readonly any[]> = {
  [K in keyof T]: Exclude<T[K], FALSY_VALUES_SAFE>;
};

function compactImpl<T>(array: ArrayContainer<T>): Compact<T[]> {
  return array.filter(item => !FALSY_VALUES.includes(item as any)) as Compact<T[]>;
}

/**
 * Removes all falsy values from the array
 *
 * @category Array
 * @param array - The array to compact
 * @returns Returns a new array with all falsy values removed
 * @example
 * const array = [0, 1, false, 2, '', 3];
 * compact(array); // [1, 2, 3]
 * compact([0, 1, false, 2, '', 3]); // [1, 2, 3]
 */
export const compact = compactImpl;
