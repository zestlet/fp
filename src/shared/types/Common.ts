export type Predicate<T> = (value: T) => boolean;

export type UnaryFunction<A, R> = (a: A) => R;
export type BinaryFunction<A, B, R> = (a: A, b: B) => R;

export type Comparator<A, B = A, R = number> = BinaryFunction<A, B, R>;

export type IsNever<T> = [T] extends [never] ? true : false;

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};
