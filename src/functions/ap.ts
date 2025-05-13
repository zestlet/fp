import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
import { AnyFunction } from '../shared/types/Function';

function apImpl<T, Fn extends AnyFunction>(fns: ArrayContainer<Fn>, values: ArrayContainer<T>): ReturnType<Fn>[] {
  return fns.flatMap(fn => values.map(item => fn(item)));
}

/**
 * Applies an array of functions to an array of values
 *
 * @category Array
 * @param fns - Array of functions to apply
 * @param values - Array of values to apply the functions to
 * @returns Returns an array containing the results of applying each function to each value
 * @example
 * const fns = [x => x + 1, x => x * 2];
 * const values = [1, 2, 3];
 * ap(fns, values); // [2, 3, 4, 2, 4, 6]
 */
export const ap = curry(apImpl) as {
  <T, Fn extends AnyFunction>(fns: ArrayContainer<Fn>, values: ArrayContainer<T>): ReturnType<Fn>[];
  <Fn extends AnyFunction>(fns: ArrayContainer<Fn>): <T2 extends Parameters<Fn>[0]>(values: ArrayContainer<T2>) => ReturnType<Fn>[];
};
