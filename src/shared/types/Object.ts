export type ObjectKeyMapFn<O extends object, R = unknown, K extends keyof O = keyof O, V = O[K]> = (key: K, value: V, obj: O) => R;
export type ObjectValueMapFn<O extends object, R = unknown, K extends keyof O = keyof O, V = O[K]> = (value: V, key: K, obj: O) => R;

export type PathValue<T, P extends readonly PropertyKey[], D = unknown> = P extends readonly []
  ? T
  : P extends readonly [infer Head, ...infer Tail extends readonly PropertyKey[]]
    ? Head extends keyof T
      ? PathValue<T[Head], Tail, D>
      : T extends readonly any[]
        ? Head extends number
          ? T[Head & number] extends infer ElementOrUndefined
            ? PathValue<ElementOrUndefined, Tail, D>
            : D
          : D
        : D
    : D;
