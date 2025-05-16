import { curry } from './curry';
import { ArrayContainer, ArrayReducer } from '../shared/types/Array';

function reduceWhileImpl<T, A>(
  predicate: ArrayReducer<A, T>,
  reducer: ArrayReducer<A, T, A>,
  initialValue: A,
  array: ArrayContainer<T>
): A {
  let acc: A = initialValue;
  for (let i = 0; i < array.length; i++) {
    const nextAcc = reducer(acc, array[i], i, array);
    if (!predicate(nextAcc, array[i], i, array)) break;
    acc = nextAcc;
  }
  return acc;
}

/**
 * Reduces the array while the predicate function returns true
 *
 * @category Array
 * @param predicate - The predicate function to test each element
 * @param reducer - The reducer function to apply
 * @param initialValue - The initial value for the reduction
 * @param array - The array to reduce
 * @returns Returns the reduced value
 * @example
 * const array = [1, 2, 3, 4, 5];
 * reduceWhile(
 *   (acc, val) => acc + val < 10,
 *   (acc, val) => acc + val,
 *   0,
 *   array
 * ); // 6
 */
export const reduceWhile = curry(reduceWhileImpl) as {
  <T, A>(predicate: ArrayReducer<A, T, boolean>, reducer: ArrayReducer<A, T, A>, initialValue: A, array: ArrayContainer<T>): A;
  <T, A>(
    predicate: ArrayReducer<A, T, boolean>,
    reducer: ArrayReducer<A, T, A>,
    initialValue: A
  ): <T2 extends T>(array: ArrayContainer<T2>) => A;
  <T, A>(
    predicate: ArrayReducer<A, T, boolean>,
    reducer: ArrayReducer<A, T, A>
  ): {
    <T2 extends T, A2 extends A>(initialValue: A2, array: ArrayContainer<T2>): A2 | A;
    <const A2 extends A>(initialValue: A2): <T2 extends T>(array: ArrayContainer<T2>) => A2 | A;
  };
  <T, A>(
    predicate: ArrayReducer<A, T, boolean>
  ): {
    <T2 extends T, const A2 extends A>(reducer: ArrayReducer<A2, T2, A2>, initialValue: A2, array: ArrayContainer<T2>): A2 | A2;
    <T2 extends T, const A2 extends A>(
      reducer: ArrayReducer<A2, T2, A2>,
      initialValue: A2
    ): <T3 extends T2>(array: ArrayContainer<T3>) => A2 | A2;
    <T2 extends T, A2 extends A>(
      reducer: ArrayReducer<A2, T2, A2>
    ): {
      <T3 extends T2, const A3 extends A2>(initialValue: A3, array: ArrayContainer<T3>): A3 | A2;
      <const A3 extends A2>(initialValue: A3): <T3 extends T2>(array: ArrayContainer<T3>) => A3 | A2;
    };
  };
};
