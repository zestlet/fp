import { ArrayContainer } from '../shared/types/Array';
import { curry } from './curry';

function adjustImpl<T, U>(index: number, transform: (value: T) => U, array: ArrayContainer<T>): (T | U)[] {
  if (index < 0 || index >= array.length) return [...array];
  return [...array.slice(0, index), transform(array[index]), ...array.slice(index + 1)];
}

export const adjust = curry(adjustImpl) as {
  <T, U>(index: number, transform: (value: T) => U, array: ArrayContainer<T>): (T | U)[];
  <T, U>(index: number, transform: (value: T) => U): <T2 extends T>(array: ArrayContainer<T2>) => (T | U)[];
  <T, U>(
    index: number
  ): {
    <T2 extends T, U2 extends U>(transform: (value: T2) => U2, array: ArrayContainer<T2>): (T2 | U2)[];
    <T2 extends T, U2 extends U>(transform: (value: T2) => U2): <T3 extends T2>(array: ArrayContainer<T3>) => (T3 | U2)[];
  };
};
