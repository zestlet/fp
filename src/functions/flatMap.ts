import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';
import { FlattenArray } from '../shared/types/ArrayFlatten';
// import { PropFunction } from './prop';

function flatMapImpl<T, U>(callbackfn: ArrayCallback<T, U | U[]>, data: ArrayContainer<T>): U[] {
  return data.flatMap(callbackfn);
}

export const flatMap = curry(flatMapImpl) as {
  <T, R>(callbackfn: ArrayCallback<T, R>, data: ArrayContainer<T>): FlattenArray<R>;
  <T, R>(callbackfn: ArrayCallback<T, R>): (array: ArrayContainer<T>) => FlattenArray<R>;
};
