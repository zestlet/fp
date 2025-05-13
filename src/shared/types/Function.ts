export type GenericFunction<Args extends readonly any[] = any[], R = any> = (...args: Args) => R;
export type AnyFunction = GenericFunction<any[], any>;
export type UnknownFunction = GenericFunction<unknown[], unknown>;

export type Awaitable<T = any> = T | Promise<T> | PromiseLike<T>;
export type AwaitableFunction<Args extends readonly any[] = any[], Return = any> = GenericFunction<Args, Awaitable<Return>>;

export type FirstFn<T extends readonly AnyFunction[]> = T extends [infer First, ...any[]] ? First : never;
export type LastFn<T extends readonly AnyFunction[]> = T extends [...any[], infer Last] ? Last : never;

export type ConstantFunction<T> = (...anyArgs: unknown[]) => T;
