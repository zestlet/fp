import { curry } from './curry';
import { ArrayContainer, ArrayReducer } from '../shared/types/Array';

function reduceImpl<T, A>(reducer: ArrayReducer<A, T>, initialValue: A, array: ArrayContainer<T>): A {
  return array.reduce(reducer, initialValue);
}

export const reduce = curry(reduceImpl) as {
  <T, A, R>(reducer: ArrayReducer<A, T, R>, initialValue: A, array: ArrayContainer<T>): R;
  <T, A>(reducer: ArrayReducer<A, T, A>, initialValue: A): <T2 extends T>(array: ArrayContainer<T2>) => A;
  <T, A>(
    reducer: ArrayReducer<A, T, A>
  ): {
    <T2 extends T, A2 extends A>(initialValue: A, array: ArrayContainer<T2>): A2 | A;
    <const A2 extends A>(initialValue: A2): <T2 extends T>(array: ArrayContainer<T2>) => A2 | A;
  };
};
