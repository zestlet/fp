import { curry } from './curry';

function setPathImpl<T, const P extends readonly PropertyKey[], const V>(path: P, value: V, obj: T): unknown {
  const [pivot, ...rest] = path;

  if (pivot === undefined) {
    return value;
  }

  const nextIsArray = rest.length > 0 && typeof rest[0] === 'number' && Number(rest[0]) >= 0;

  if (obj === undefined || obj === null) {
    const container = typeof pivot === 'number' && Number(pivot) >= 0 ? [] : {};
    return setPathImpl(path, value, container);
  }

  if (Array.isArray(obj)) {
    const numericPivot = Number(pivot);
    const copy = [...obj];

    if (isNaN(numericPivot)) {
      throw new Error(`Cannot use non-numeric index with array: ${String(pivot)}`);
    }

    copy[numericPivot] = setPathImpl(rest, value, obj[numericPivot] === undefined ? (nextIsArray ? [] : {}) : obj[numericPivot]);
    return copy;
  }

  if (typeof obj === 'object') {
    const record = obj as Record<PropertyKey, unknown>;
    const currentValue = record[pivot];

    if (currentValue !== undefined && currentValue !== null && typeof currentValue !== 'object') {
      const container = typeof rest[0] === 'number' && Number(rest[0]) >= 0 ? [] : {};
      return {
        ...record,
        [pivot]: setPathImpl(rest, value, container),
      };
    }

    return {
      ...record,
      [pivot]: setPathImpl(rest, value, currentValue === undefined ? (nextIsArray ? [] : {}) : currentValue),
    };
  }

  const container = typeof pivot === 'number' && Number(pivot) >= 0 ? [] : {};
  return setPathImpl(path, value, container);
}

/**
 * Sets a value at a given path in a nested object and returns a new object.
 * If the path doesn't exist, it will be created automatically.
 * For non-negative integer keys, arrays will be created; for other keys, objects will be created.
 *
 * @category Object
 * @param path - The path to set the value at
 * @param value - The value to set
 * @param obj - The object to set the value in
 * @returns Returns a new object with the value set at the given path
 * @throws {Error} If trying to set a property of null or non-object
 * @example
 * const obj = { user: { name: 'John', age: 30 } };
 * setPath(['user', 'age'], 31, obj); // { user: { name: 'John', age: 31 } }
 * setPath(['user', 'age'])(31)(obj); // { user: { name: 'John', age: 31 } }
 * setPath(['user', 'address', 'city'], 'New York', obj); // { user: { name: 'John', age: 30, address: { city: 'New York' } } }
 * setPath(['items', 0, 'name'], 'Item 1', {}); // { items: [{ name: 'Item 1' }] }
 */
export const setPath = curry(setPathImpl) as {
  <T, const P extends readonly PropertyKey[], const V>(path: P, value: V, obj: T): SetByPath<T, P, V>;
  <T, const P extends readonly PropertyKey[], const V>(path: P, value: V): <T2 extends T>(obj: T2) => SetByPath<T, P, V>;
  <T, const P extends readonly PropertyKey[]>(
    path: P
  ): {
    <T2 extends T, const V>(value: V, obj: T2): SetByPath<T, P, V>;
    <const V>(value: V): <T2 extends T>(obj: T2) => SetByPath<T, P, V>;
  };
};

type IsNumberKey<K> = K extends number ? true : K extends `${number}` ? true : false;

type ToNumber<S extends string> = S extends `${infer N extends number}` ? N : never;

type CreateTupleWithValue<Index extends number, Value, Rest = unknown> = {
  [K in Index]: Value;
} & { [k: number]: Rest };

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type SetByPath<Obj, Path extends readonly PropertyKey[], Value> = Path extends readonly []
  ? Obj
  : Path extends readonly [infer First extends PropertyKey, ...infer Rest extends PropertyKey[]]
    ? IsNumberKey<First> extends true
      ? // 处理数组索引路径
        First extends `${infer N extends number}`
        ? Rest['length'] extends 0
          ? Obj extends any[]
            ? Omit<Obj, N> & Record<N, Value> // 更新现有数组元素
            : Prettify<CreateTupleWithValue<ToNumber<`${N}`>, Value>> // 创建新数组
          : Obj extends any[]
            ? Omit<Obj, N> & Record<N, SetByPath<Obj[ToNumber<`${N}`>] extends undefined ? {} : Obj[ToNumber<`${N}`>], Rest, Value>>
            : Prettify<CreateTupleWithValue<ToNumber<`${N}`>, SetByPath<{}, Rest, Value>>>
        : First extends number
          ? Rest['length'] extends 0
            ? Obj extends any[]
              ? Omit<Obj, `${First}`> & Record<`${First}`, Value>
              : Prettify<CreateTupleWithValue<First, Value>>
            : Obj extends any[]
              ? Omit<Obj, `${First}`> & Record<`${First}`, SetByPath<Obj[First] extends undefined ? {} : Obj[First], Rest, Value>>
              : Prettify<CreateTupleWithValue<First, SetByPath<{}, Rest, Value>>>
          : never
      : // 处理对象属性路径
        Rest['length'] extends 0
        ? Obj extends object
          ? Prettify<Omit<Obj, First> & Record<First & string, Value>>
          : Prettify<Record<First & string, Value>>
        : Obj extends object
          ? Prettify<Omit<Obj, First> & Record<First & string, SetByPath<First extends keyof Obj ? Obj[First] : {}, Rest, Value>>>
          : Prettify<Record<First & string, SetByPath<{}, Rest, Value>>>
    : Obj;
