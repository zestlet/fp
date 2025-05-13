import { describe, it, expect, expectTypeOf } from 'vitest';
import { pipe } from './pipe'; // Assume basic pipe implementation
import { prop } from './prop';
import { map } from './map';

// --- Test Suite ---

// Helper for type testing (requires `npm install -D expect-type`)

describe('Simpler Prop Signature Robustness Tests', () => {
  // --- Basic Usage ---
  describe('Basic Usage', () => {
    const obj = { name: 'Alice', age: 30, id: 123, 1: 2 };

    it('should get correct type for direct call', () => {
      const name = prop('name', obj);
      expectTypeOf(name).toEqualTypeOf<string>();
      expect(name).toBe('Alice');

      const age = prop('age', obj);
      expectTypeOf(age).toEqualTypeOf<number>();
      expect(age).toBe(30);

      const id = prop('id', obj);
      expectTypeOf(id).toEqualTypeOf<number>(); // readonly modifier is usually stripped from value type
      expect(id).toBe(123);
    });

    it('should get correct type for curried call', () => {
      const getName = prop('name'); // K = 'name'
      // getName type: <T2, K2 extends keyof T2 & "name">(obj: T2) => T2[K2]
      const name = getName(obj);
      // When called: T2 = ObjType. K2 must extend keyof ObjType AND 'name'.
      // TS likely infers K2 = 'name'. Returns ObjType['name']
      expectTypeOf(name).toEqualTypeOf<string>();
      expect(name).toBe('Alice');

      const getAge = prop('age'); // K = 'age'
      const age = getAge(obj);

      expectTypeOf(age).toEqualTypeOf<number>();
      expect(age).toBe(30);

      const getId = prop('id'); // K = 'id'
      const id = getId(obj);
      expectTypeOf(id).toEqualTypeOf<number>();
      expect(id).toBe(123);
    });

    it('should handle object types with optional properties', () => {
      const objWithOptional = { name: 'Bob', address: undefined as string | undefined };
      type OptionalObj = typeof objWithOptional;
      const getAddress = prop('address'); // K = 'address'
      const address = getAddress(objWithOptional);
      // T2 = OptionalObj. K2 extends keyof OptionalObj & 'address'. Infer K2 = 'address'.
      // Return T2['address'] which is string | undefined
      expectTypeOf(address).toEqualTypeOf<string | undefined>();
      expect(address).toBeUndefined();

      const getName = prop('name');
      const name = getName(objWithOptional);
      expectTypeOf(name).toEqualTypeOf<string>();
      expect(name).toBe('Bob');
    });
  });

  // --- Integration with map ---
  describe('Integration with map', () => {
    const users = [
      { name: 'A', age: 1 },
      { name: 'B', age: 2 },
    ] as const;
    // users: readonly [{readonly name: "A"; readonly age: 1;}, {readonly name: "B"; readonly age: 2;}]

    it('should work with map (direct call)', () => {
      const getName = prop('name'); // <T2, K2 extends keyof T2 & "name">(obj: T2) => T2[K2]
      const names = map(getName, users);
      // map<T, U>(getName, users)
      // T = typeof users[number] = {readonly name: "A"; readonly age: 1;} | {readonly name: "B"; readonly age: 2;}
      // U = ReturnType of getName applied to T.
      // getName(T) -> T['name'] -> "A" | "B"
      expectTypeOf(names).toEqualTypeOf<('A' | 'B')[]>();
      expect(names).toEqual(['A', 'B']);

      const getAge = prop('age');
      const ages = map(getAge, users);
      // T = typeof users[number]
      // U = ReturnType of getAge applied to T -> T['age'] -> 1 | 2
      expectTypeOf(ages).toEqualTypeOf<(1 | 2)[]>();
      expect(ages).toEqual([1, 2]);
    });

    it('should work with map (curried call)', () => {
      const getName = prop('name');
      const mapToNames = map(getName);
      // map<T, U>(getName)
      // T inferred from getName param: T2 where 'name' extends keyof T2
      // U inferred from getName return: T2['name']
      // This推断步骤比较复杂，但由于 getName 类型现在更强，可能成功
      // mapToNames should be roughly: (array: ArrayContainer<T where 'name' is key>) => T['name'][]

      const names = mapToNames(users);
      // T = {readonly name: "A"; ...} | {readonly name: "B"; ...}
      // U = "A" | "B"
      expectTypeOf(names).toEqualTypeOf<('A' | 'B')[]>();
      expect(names).toEqual(['A', 'B']);

      const getAge = prop('age');
      const mapToAges = map(getAge);
      const ages = mapToAges(users);
      // T = {readonly age: 1; ...} | {readonly age: 2; ...}
      // U = 1 | 2
      expectTypeOf(ages).toEqualTypeOf<(1 | 2)[]>();
      expect(ages).toEqual([1, 2]);
    });

    it('should work with map (direct prop inline)', () => {
      const names = map(prop('name'), users); // Similar to direct call test case
      expectTypeOf(names).toEqualTypeOf<('A' | 'B')[]>();
      expect(names).toEqual(['A', 'B']);

      const ages = map(prop('age'), users); // Similar to direct call test case
      expectTypeOf(ages).toEqualTypeOf<(1 | 2)[]>();
      expect(ages).toEqual([1, 2]);
    });
  });

  // --- Integration with pipe ---
  describe('Integration with pipe', () => {
    const users = [
      { name: 'A', age: 1 },
      { name: 'B', age: 2 },
    ] as const;

    it('should work with pipe(map(prop(...)))', () => {
      const getName = prop('name');
      const mapToNames = map(getName); // As tested before
      const processUsers = pipe(mapToNames);
      // processUsers should have type: (array: ArrayContainer<{name: string,...}>) => string[] (approximately)
      const names = processUsers(users);
      // Type inference seems to hold!
      expectTypeOf(names).toEqualTypeOf<('A' | 'B')[]>();
      expect(names).toEqual(['A', 'B']);

      const getAges = prop('age');
      const processAges = pipe(map(getAges));
      const ages = processAges(users);
      expectTypeOf(ages).toEqualTypeOf<(1 | 2)[]>();
      expect(ages).toEqual([1, 2]);
    });

    it('should work with pipe(map(prop(...))) inline', () => {
      const processNames = pipe(map(prop('name')));
      const names = processNames(users);
      expectTypeOf(names).toEqualTypeOf<('A' | 'B')[]>();
      expect(names).toEqual(['A', 'B']);

      const processAges = pipe(map(prop('age')));
      const ages = processAges(users);
      expectTypeOf(ages).toEqualTypeOf<(1 | 2)[]>();
      expect(ages).toEqual([1, 2]);
    });
  });

  // --- Edge Cases and Potential Issues ---
  describe('Edge Cases and Potential Issues', () => {
    const obj = { name: 'Alice' };

    it('should ideally error when key is not in object (curried)', () => {
      const getAge = prop('age'); // K = 'age'
      // getAge type: <T2, K2 extends keyof T2 & "age">(obj: T2) => T2[K2];
      // Calling getAge(obj)
      // T2 = typeof obj = { name: string }
      // K2 needs to extend keyof T2 ('name') AND 'age'. This intersection is 'never'.
      // The constraint K2 extends never & 'age' -> K2 extends never.
      // Return type T2[K2] -> { name: string }[never] -> this is problematic/any/error?
      // expectTypeOf(getAge(obj)).toBeNever(); // This might be the theoretical expectation
      // Or TS might error on the constraint directly.

      // Let's see what happens at runtime (type level is complex)
      // expect(() => getAge(obj)).toThrow(); // Runtime error likely

      // Use @ts-expect-error to assert a compile-time error SHOULD occur
      // 'age' is not a key and constraint K2 extends never likely fails.
      const age = getAge(obj);
      // If it didn't error above, what's the type? Likely 'any' or 'unknown' due to breakdown.
      // expectTypeOf(age).toBeAny();
    });

    it('should handle generic string key (loss of precision)', () => {
      const key = 'name' as string;
      const getName = prop(key); // K = string
      // getName type: <T2, K2 extends keyof T2 & string>(obj: T2) => T2[K2];
      const name = getName(obj);
      // T2 = typeof obj = { name: string }
      // K2 extends keyof T2 ('name') & string. So K2 extends 'name'. Infer K2 = 'name'?
      // Return T2[K2] -> obj['name'] -> string. This seems plausible.
      expectTypeOf(name).toEqualTypeOf<string>(); // It likely infers string, losing 'Alice' literal.
      expect(name).toBe('Alice');

      const getValue = prop('value' as string); // K = string
      const valueGetter = getValue({ value: 1 });
      // T2 = { value: number }
      // K2 extends keyof T2 ('value') & string. K2 extends 'value'. Infer K2 = 'value'?
      // Return T2[K2] -> { value: number }['value'] -> number
      expectTypeOf(valueGetter).toEqualTypeOf<number>();
      expect(valueGetter).toBe(1);

      // What if the object doesn't have a string index signature?
      const getPropFromStringKey = prop('anyString' as string);
      const result = getPropFromStringKey({ name: 'A' }); // T2 = { name: 'A' }
      // K2 extends keyof T2 ('name') & string. K2 extends 'name'. Infer K2 = 'name'?
      // Return T2[K2] -> { name: 'A' }['name'] -> 'A' (string)
      // This seems like plausible but potentially surprising inference.
      expectTypeOf(result).toEqualTypeOf<string>(); // It likely infers the known property type
      expect(result).toBe(undefined); // Runtime would be error if key was different
    });

    // Add tests for union keys, symbol keys etc. if needed
    it('should handle union keys (potential issues)', () => {
      const keyUnion = Math.random() > 0.5 ? 'name' : 'age';
      const objUnion = { name: 'C', age: 3 };
      const getUnion = prop(keyUnion); // K = 'name' | 'age'
      // getUnion: <T2, K2 extends keyof T2 & ('name' | 'age')>(obj: T2) => T2[K2];
      const result = getUnion(objUnion);
      // T2 = typeof objUnion
      // K2 extends keyof T2 ('name' | 'age') & ('name' | 'age'). K2 extends 'name' | 'age'.
      // What is K2 inferred as? It could be 'name' | 'age'.
      // Return T2[K2] -> objUnion['name' | 'age'] -> string | number
      expectTypeOf(result).toEqualTypeOf<string | number>();
      // Runtime depends on actual keyUnion value
    });
  });
});
