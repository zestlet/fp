export type ObjectKeyMapFn<O extends object, R = unknown, K extends keyof O = keyof O, V = O[K]> = (key: K, value: V, obj: O) => R;
export type ObjectValueMapFn<O extends object, R = unknown, K extends keyof O = keyof O, V = O[K]> = (value: V, key: K, obj: O) => R;
