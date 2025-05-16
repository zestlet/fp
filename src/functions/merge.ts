import { curry } from './curry';
import { mergeWithImpl, mergeWithInPlaceImpl } from './mergeWith';
export { mergeDeleteSymbol, type MergeDeleteSymbol } from './mergeWith';

function mergeImpl<T extends object, S extends object>(target: T, source: S) {
  return mergeWithImpl(null, target, source);
}

function mergeInPlaceImpl<T extends object, S extends object>(target: T, source: S) {
  return mergeWithInPlaceImpl(null, target, source);
}

export const merge = curry(mergeImpl) as {
  <T extends object, S extends object>(target: T, source: S): T & S;
  <T extends object>(target: T): <S extends object>(source: S) => T & S;
};

export const mergeInPlace = curry(mergeInPlaceImpl) as {
  <T extends object, S extends object>(target: T, source: S): T & S;
  <T extends object>(target: T): <S extends object>(source: S) => T & S;
};
