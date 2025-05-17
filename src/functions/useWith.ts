import { curry } from './curry';

type OptionalTuple<T extends readonly any[]> = { [K in keyof T]?: T[K] };
type Fn<T, R> = (value: T) => R;

/**
 * Creates a function that applies transformation functions to arguments before passing them to the main function
 *
 * @category Function
 * @param fn - The main function to call with transformed arguments
 * @param transformers - Array of transformation functions to apply to arguments
 * @returns Returns a new function that applies transformations to arguments before calling the main function
 * @example
 * const add = (a: number, b: number) => a + b;
 * const double = (n: number) => n * 2;
 * const triple = (n: number) => n * 3;
 *
 * const addWithTransforms = useWith(add, [double, triple]);
 * addWithTransforms(2, 3); // 13 (2*2 + 3*3)
 */
function useWithImpl<T extends any[], R>(fn: (...args: T) => R, transformers: { [K in keyof T]?: Fn<any, T[K]> }): (...args: T) => R {
  return (...args: T) => {
    const transformedArgs = args.map((arg, index) => {
      const transformer = transformers[index];
      return transformer ? transformer(arg) : arg;
    }) as T;
    return fn(...transformedArgs);
  };
}

export const useWith = curry(useWithImpl) as {
  <R>(fn: (...args: []) => R, transformers: []): (...args: []) => R;
  <R, A1, T1>(fn: (...args: [A1]) => R, transformers: [Fn<T1, A1>]): (...args: [T1]) => R;
  <R, A1, A2, T1, T2>(fn: (...args: [A1, A2]) => R, transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>]>): (...args: [T1, T2]) => R;
  <R, A1, A2, A3, T1, T2, T3>(
    fn: (...args: [A1, A2, A3]) => R,
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>]>
  ): (...args: [T1, T2, T3]) => R;
  <R, A1, A2, A3, A4, T1, T2, T3, T4>(
    fn: (...args: [A1, A2, A3, A4]) => R,
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>]>
  ): (...args: [T1, T2, T3, T4]) => R;
  <R, A1, A2, A3, A4, A5, T1, T2, T3, T4, T5>(
    fn: (...args: [A1, A2, A3, A4, A5]) => R,
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>]>
  ): (...args: [T1, T2, T3, T4, T5]) => R;
  <R, A1, A2, A3, A4, A5, A6, T1, T2, T3, T4, T5, T6>(
    fn: (...args: [A1, A2, A3, A4, A5, A6]) => R,
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>]>
  ): (...args: [T1, T2, T3, T4, T5, T6]) => R;
  <R, A1, A2, A3, A4, A5, A6, A7, T1, T2, T3, T4, T5, T6, T7>(
    fn: (...args: [A1, A2, A3, A4, A5, A6, A7]) => R,
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>, Fn<T7, A7>]>
  ): (...args: [T1, T2, T3, T4, T5, T6, T7]) => R;
  <R, A1, A2, A3, A4, A5, A6, A7, A8, T1, T2, T3, T4, T5, T6, T7, T8>(
    fn: (...args: [A1, A2, A3, A4, A5, A6, A7, A8]) => R,
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>, Fn<T7, A7>, Fn<T8, A8>]>
  ): (...args: [T1, T2, T3, T4, T5, T6, T7, T8]) => R;
  <R, A1, A2, A3, A4, A5, A6, A7, A8, A9, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn: (...args: [A1, A2, A3, A4, A5, A6, A7, A8, A9]) => R,
    transformers: OptionalTuple<
      [Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>, Fn<T7, A7>, Fn<T8, A8>, Fn<T9, A9>]
    >
  ): (...args: [T1, T2, T3, T4, T5, T6, T7, T8, T9]) => R;
  <R, A1, A2, A3, A4, A5, A6, A7, A8, A9, A10, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn: (...args: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10]) => R,
    transformers: OptionalTuple<
      [Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>, Fn<T7, A7>, Fn<T8, A8>, Fn<T9, A9>, Fn<T10, A10>]
    >
  ): (...args: [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]) => R;

  // curry
  <R>(fn: (...args: []) => R): (transformers: []) => (...args: []) => R;
  <R, A1>(fn: (...args: [A1]) => R): <T1>(transformers: OptionalTuple<[Fn<T1, A1>]>) => (...args: [T1]) => R;
  <R, A1, A2>(fn: (...args: [A1, A2]) => R): <T1, T2>(transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>]>) => (...args: [T1, T2]) => R;
  <R, A1, A2, A3>(
    fn: (...args: [A1, A2, A3]) => R
  ): <T1, T2, T3>(transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>]>) => (...args: [T1, T2, T3]) => R;
  <R, A1, A2, A3, A4>(
    fn: (...args: [A1, A2, A3, A4]) => R
  ): <T1, T2, T3, T4>(transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>]>) => (...args: [T1, T2, T3, T4]) => R;
  <R, A1, A2, A3, A4, A5>(
    fn: (...args: [A1, A2, A3, A4, A5]) => R
  ): <T1, T2, T3, T4, T5>(
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>]>
  ) => (...args: [T1, T2, T3, T4, T5]) => R;
  <R, A1, A2, A3, A4, A5, A6>(
    fn: (...args: [A1, A2, A3, A4, A5, A6]) => R
  ): <T1, T2, T3, T4, T5, T6>(
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>]>
  ) => (...args: [T1, T2, T3, T4, T5, T6]) => R;
  <R, A1, A2, A3, A4, A5, A6, A7>(
    fn: (...args: [A1, A2, A3, A4, A5, A6, A7]) => R
  ): <T1, T2, T3, T4, T5, T6, T7>(
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>, Fn<T7, A7>]>
  ) => (...args: [T1, T2, T3, T4, T5, T6, T7]) => R;
  <R, A1, A2, A3, A4, A5, A6, A7, A8>(
    fn: (...args: [A1, A2, A3, A4, A5, A6, A7, A8]) => R
  ): <T1, T2, T3, T4, T5, T6, T7, T8>(
    transformers: OptionalTuple<[Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>, Fn<T7, A7>, Fn<T8, A8>]>
  ) => (...args: [T1, T2, T3, T4, T5, T6, T7, T8]) => R;
  <R, A1, A2, A3, A4, A5, A6, A7, A8, A9>(
    fn: (...args: [A1, A2, A3, A4, A5, A6, A7, A8, A9]) => R
  ): <T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    transformers: OptionalTuple<
      [Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>, Fn<T7, A7>, Fn<T8, A8>, Fn<T9, A9>]
    >
  ) => (...args: [T1, T2, T3, T4, T5, T6, T7, T8, T9]) => R;
  <R, A1, A2, A3, A4, A5, A6, A7, A8, A9, A10>(
    fn: (...args: [A1, A2, A3, A4, A5, A6, A7, A8, A9, A10]) => R
  ): <T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    transformers: OptionalTuple<
      [Fn<T1, A1>, Fn<T2, A2>, Fn<T3, A3>, Fn<T4, A4>, Fn<T5, A5>, Fn<T6, A6>, Fn<T7, A7>, Fn<T8, A8>, Fn<T9, A9>, Fn<T10, A10>]
    >
  ) => (...args: [T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]) => R;
};
