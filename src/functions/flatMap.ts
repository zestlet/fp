import { curry } from './curry';
import { ArrayCallback, ArrayContainer } from '../shared/types/Array';

function flatMapImpl<T, U>(callbackfn: ArrayCallback<T, U | U[]>, data: ArrayContainer<T>): U[] {
  return data.flatMap(callbackfn);
}

export const flatMap = curry(flatMapImpl) as {
  <T, U>(callbackfn: ArrayCallback<T, U | U[]>, data: ArrayContainer<T>): U[];
  <T, U>(callbackfn: ArrayCallback<T, U | U[]>): <T2 extends T>(data: ArrayContainer<T2>) => U[];
};
