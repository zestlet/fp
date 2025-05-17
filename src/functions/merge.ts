import { curry } from './curry';
import { mergeWithImpl, mergeWithInPlaceImpl } from './mergeWith';
export { mergeDeleteSymbol, type MergeDeleteSymbol } from './mergeWith';

function mergeLeftImpl<T extends object, S extends object>(target: T, source: S) {
  return mergeWithImpl(null, target, source);
}

function mergeRightImpl<T extends object, S extends object>(target: T, source: S) {
  return mergeWithImpl(null, source, target);
}

function mergeLeftInPlaceImpl<T extends object, S extends object>(target: T, source: S) {
  return mergeWithInPlaceImpl(null, target, source);
}

function mergeRightInPlaceImpl<T extends object, S extends object>(target: T, source: S) {
  return mergeWithInPlaceImpl(null, source, target);
}

export const mergeLeft = curry(mergeLeftImpl) as {
  <T extends object, S extends object>(target: T, source: S): T & S;
  <T extends object>(target: T): <S extends object>(source: S) => T & S;
};

export const mergeRight = curry(mergeRightImpl) as {
  <T extends object, S extends object>(target: T, source: S): T & S;
  <T extends object>(target: T): <S extends object>(source: S) => T & S;
};

export const mergeLeftInPlace = curry(mergeLeftInPlaceImpl) as {
  <T extends object, S extends object>(target: T, source: S): T & S;
  <T extends object>(target: T): <S extends object>(source: S) => T & S;
};

export const mergeRightInPlace = curry(mergeRightInPlaceImpl) as {
  <T extends object, S extends object>(target: T, source: S): T & S;
  <T extends object>(target: T): <S extends object>(source: S) => T & S;
};
