export type ArrayContainer<T = unknown> = readonly T[];
export type GenericArrayContainer = ArrayContainer<unknown>;

export type ArrayCallback<T, R, A = ArrayContainer<T>> = {
  (item: T, index: number, array: A): R;
};
export type ArrayPredicate<T, A = ArrayContainer<T>> = ArrayCallback<T, boolean, A>;

export type ArrayReducer<P, C, R = P, A extends ArrayContainer = ArrayContainer<C>> = (
  previousValue: P,
  currentValue: C,
  index: number,
  array: A
) => R;
