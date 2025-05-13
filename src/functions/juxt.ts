import { curry } from './curry';
import { ArrayContainer } from '../shared/types/Array';
import { AnyFunction } from '../shared/types/Function';
import { IsNever } from '../shared/types/Common';

function juxtImpl<Fn extends AnyFunction>(
  fns: ArrayContainer<Fn>,
  value: IsNever<Fn> extends true ? unknown : Parameters<Fn>[0]
): ReturnType<Fn>[] {
  return fns.map<any>(fn => fn(value));
}

/**
 * Applies multiple functions to the same value and returns an array of results
 *
 * @category Array
 * @param fns - Array of functions to apply
 * @param value - The value to apply the functions to
 * @returns Returns an array of results from applying each function to the value
 * @example
 * const fns = [x => x + 1, x => x * 2, x => x ** 2];
 * juxt(fns, 2); // [3, 4, 4]
 * juxt(fns)(2); // [3, 4, 4]
 */
export const juxt = curry(juxtImpl) as {
  <Fn extends AnyFunction>(fns: ArrayContainer<Fn>, value: IsNever<Fn> extends true ? unknown : Parameters<Fn>[0]): ReturnType<Fn>[];
  <Fn extends AnyFunction>(fns: ArrayContainer<Fn>): (value: IsNever<Fn> extends true ? unknown : Parameters<Fn>[0]) => ReturnType<Fn>[];
};
