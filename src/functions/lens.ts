import { curry } from './curry';
import { setPath } from './setPath';
import { path } from './path';

/**
 * A lens is a pair of functions that allow you to focus on a specific part of a data structure.
 * The getter function retrieves the focused value, and the setter function creates a new data structure
 * with the focused value updated.
 */
export interface Lens<S, A> {
  get: (s: S) => A;
  set: (a: A, s: S) => S;
}

/**
 * Creates a lens from a getter and setter function
 *
 * @category Object
 * @param getter - Function to get the focused value
 * @param setter - Function to set the focused value
 * @returns Returns a lens object with get and set methods
 * @example
 * const nameLens = lens(
 *   (obj) => obj.name,
 *   (name, obj) => ({ ...obj, name })
 * );
 * view(nameLens, { name: 'Alice', age: 20 }); // 'Alice'
 * set(nameLens, 'Bob', { name: 'Alice', age: 20 }); // { name: 'Bob', age: 20 }
 */
export function lens<S, A>(get: (s: S) => A, set: (a: A, s: S) => S): Lens<S, A> {
  return { get, set };
}

/**
 * Creates a lens that focuses on a specific property of an object
 *
 * @category Object
 * @param prop - The property name to focus on
 * @returns Returns a lens object with get and set methods
 * @example
 * const nameLens = lensProp('name');
 * view(nameLens, { name: 'Alice', age: 20 }); // 'Alice'
 * set(nameLens, 'Bob', { name: 'Alice', age: 20 }); // { name: 'Bob', age: 20 }
 */
export function lensProp<K extends PropertyKey>(prop: K): Lens<Record<K, any>, any> {
  return lens(
    obj => obj[prop],
    (value, obj) => ({ ...obj, [prop]: value })
  );
}

/**
 * Creates a lens that focuses on a specific path in an object
 *
 * @category Object
 * @param path - The path to focus on
 * @returns Returns a lens object with get and set methods
 * @example
 * const nameLens = lensPath(['user', 'profile', 'name']);
 * view(nameLens, { user: { profile: { name: 'Alice' } } }); // 'Alice'
 * set(nameLens, 'Bob', { user: { profile: { name: 'Alice' } } }); // { user: { profile: { name: 'Bob' } } }
 */
export function lensPath(pathArray: PropertyKey[]): Lens<any, any> {
  return lens(
    obj => path(pathArray, obj),
    (value, obj) => setPath(pathArray, value, obj)
  );
}

/**
 * Gets the value focused by a lens
 *
 * @category Object
 * @param lens - The lens to use
 * @param obj - The object to view
 * @returns Returns the focused value
 * @example
 * const nameLens = lensProp('name');
 * view(nameLens, { name: 'Alice', age: 20 }); // 'Alice'
 */
export const lensView = curry(<S, A>(lens: Lens<S, A>, obj: S): A => {
  return lens.get(obj);
}) as {
  <S, A>(lens: Lens<S, A>, obj: S): A;
  <S, A>(lens: Lens<S, A>): (obj: S) => A;
};

/**
 * Sets the value focused by a lens
 *
 * @category Object
 * @param lens - The lens to use
 * @param value - The new value to set
 * @param obj - The object to update
 * @returns Returns a new object with the focused value updated
 * @example
 * const nameLens = lensProp('name');
 * set(nameLens, 'Bob', { name: 'Alice', age: 20 }); // { name: 'Bob', age: 20 }
 */
export const lensSet = curry(<S, A>(lens: Lens<S, A>, value: A, obj: S): S => {
  return lens.set(value, obj);
}) as {
  <S, A>(lens: Lens<S, A>, value: A, obj: S): S;
  <S, A>(lens: Lens<S, A>, value: A): (obj: S) => S;
  <S, A>(lens: Lens<S, A>): (value: A) => (obj: S) => S;
};

/**
 * Applies a function to the value focused by a lens
 *
 * @category Object
 * @param lens - The lens to use
 * @param fn - The function to apply
 * @param obj - The object to update
 * @returns Returns a new object with the focused value transformed
 * @example
 * const nameLens = lensProp('name');
 * over(nameLens, (name) => name.toUpperCase(), { name: 'Alice', age: 20 }); // { name: 'ALICE', age: 20 }
 */
export const lensOver = curry(<S, A>(lens: Lens<S, A>, fn: (a: A) => A, obj: S): S => {
  return lens.set(fn(lens.get(obj)), obj);
}) as {
  <S, A>(lens: Lens<S, A>, fn: (a: A) => A, obj: S): S;
  <S, A>(lens: Lens<S, A>, fn: (a: A) => A): (obj: S) => S;
  <S, A>(lens: Lens<S, A>): (fn: (a: A) => A) => (obj: S) => S;
};
