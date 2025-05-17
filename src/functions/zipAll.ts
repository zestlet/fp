import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';

export const ZipAllShortest = Symbol('ZipAllShortest');

type ZipAllMode<T> = T | typeof ZipAllShortest;

function zipAllImpl<D, T>(defaultValue: ZipAllMode<D>, arrays: ArrayContainer<T[]>): (T | D)[][] {
  if (arrays.length === 0) return [];

  if (defaultValue === ZipAllShortest) {
    // 按最短长度截断
    const minLength = Math.min(...arrays.map(arr => arr.length));
    return Array.from({ length: minLength }, (_, i) => arrays.map(arr => arr[i]));
  } else {
    // 按最长长度填充
    const maxLength = Math.max(...arrays.map(arr => arr.length));
    return Array.from({ length: maxLength }, (_, i) => arrays.map(arr => (i < arr.length ? arr[i] : defaultValue)));
  }
}

/**
 * Zips multiple arrays together, either using a default value to fill shorter arrays
 * or using the shortest array length as the target length
 *
 * @category Array
 * @param defaultValue - The value to use for filling shorter arrays, or ZipAllShortest to use shortest length
 * @param arrays - The arrays to zip together
 * @returns Returns a new array of arrays containing the zipped values
 * @example
 * const arrays = [[1, 2, 3], [4, 5], [6, 7, 8]];
 * zipAll(0, arrays); // [[1, 4, 6], [2, 5, 7], [3, 0, 8]]
 * zipAll(ZipAllShortest, arrays); // [[1, 4, 6], [2, 5, 7]]
 */
export const zipAll = curry(zipAllImpl) as {
  <D, T>(defaultValue: ZipAllMode<D>, arrays: ArrayContainer<T[]>): (T | D)[][];
  <D>(defaultValue: ZipAllMode<D>): <T>(arrays: ArrayContainer<T[]>) => (T | D)[][];
};
