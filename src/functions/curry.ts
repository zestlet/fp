export function curry<T extends any[], R>(fn: (...args: T) => R) {
  return function curried(...args: any[]): any {
    if (args.length >= fn.length) {
      return fn.apply(null, args as unknown as T);
    }
    return function (...moreArgs: any[]) {
      return curried.apply(null, [...args, ...moreArgs]);
    };
  };
}
