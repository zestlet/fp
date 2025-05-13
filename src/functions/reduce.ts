import { curry } from './curry';
import { ArrayContainer, ArrayReducer } from '../shared/types/Array';

function reduceImpl<T, A>(reducer: ArrayReducer<A, T, ArrayContainer<T>, A>, initialValue: A, array: ArrayContainer<T>): A {
  return array.reduce(reducer, initialValue);
}

export const reduce = curry(reduceImpl) as {
  <T, A>(reducer: ArrayReducer<A, T, ArrayContainer<T>, A>, initialValue: A, array: ArrayContainer<T>): A;
  <T, A>(reducer: ArrayReducer<A, T, ArrayContainer<T>, A>, initialValue: A): <T2 extends T>(array: ArrayContainer<T2>) => A;
  <T, A>(
    reducer: ArrayReducer<A, T, ArrayContainer<T>, A>
  ): {
    <T2 extends T, A2 extends A>(initialValue: A, array: ArrayContainer<T2>): A2 | A;
    <const A2 extends A>(initialValue: A2): <T2 extends T>(array: ArrayContainer<T2>) => A2 | A;
  };
};
