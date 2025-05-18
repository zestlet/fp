import { curry } from './curry';
import * as Z from '../index';

type IsArray<T> = T extends any[] ? true : false;

type Transformer<T, R = T> = (input: T) => R;
type TransformMap<T> = {
  [K in keyof T]?: T[K] extends object
    ? IsArray<T[K]> extends true
      ? Transformer<T[K]>
      : TransformMap<T[K]> | Transformer<T[K]>
    : Transformer<T[K]>;
};

/**
 * 推断转换后的类型
 */
type Evolved<T, TF extends TransformMap<T>> = {
  [K in keyof T]: K extends keyof TF
    ? TF[K] extends Transformer<T[K], infer R>
      ? R
      : T[K] extends object
        ? TF[K] extends TransformMap<T[K]>
          ? Evolved<T[K], TF[K]>
          : T[K]
        : T[K]
    : T[K];
};

function evolveImpl<T extends object, TF extends TransformMap<T>>(transformations: TF, obj: T): Evolved<T, TF> {
  const result = { ...obj } as any;
  const anyObj = obj as Record<any, any>;

  for (const key in transformations) {
    if (Object.prototype.hasOwnProperty.call(anyObj, key)) {
      const transformer = transformations[key];

      if (typeof transformer === 'function') {
        result[key] = transformer(anyObj[key]);
      } else if (transformer && typeof transformer === 'object' && anyObj[key] && typeof anyObj[key] === 'object') {
        result[key] = evolveImpl(transformer, anyObj[key]);
      }
    }
  }

  return result;
}

/**
 * Recursively transforms an object by applying transformation functions to its properties
 *
 * @category Object
 * @param transforms - An object containing transformation functions for each property
 * @param obj - The object to transform
 * @returns Returns a new object with transformed values
 * @example
 * const obj = {
 *   name: 'Alice',
 *   age: 20,
 *   scores: [1, 2, 3],
 *   profile: {
 *     email: 'alice@example.com',
 *     active: true
 *   }
 * };
 *
 * const transforms = {
 *   name: (name: string) => name.toUpperCase(),
 *   age: (age: number) => age + 1,
 *   scores: (scores: number[]) => scores.map(n => n * 2),
 *   profile: {
 *     email: (email: string) => email.toLowerCase(),
 *     active: (active: boolean) => !active
 *   }
 * };
 *
 * evolve(transforms, obj);
 * // {
 * //   name: 'ALICE',
 * //   age: 21,
 * //   scores: [2, 4, 6],
 * //   profile: {
 * //     email: 'alice@example.com',
 * //     active: false
 * //   }
 * // }
 */
export const evolve = curry(evolveImpl) as {
  <const T, TF extends TransformMap<T>>(transformations: TF, obj: T): Evolved<T, TF>;
  <const T, TF extends TransformMap<T>>(transformations: TF): <T2 extends T, TF2 extends TransformMap<T2>>(obj: T2) => Evolved<T2, TF2>;
};
