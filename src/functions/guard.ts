/**
 * Type guard functions for checking values.
 * @category Guard
 */

/**
 * Checks if a value is null or undefined.
 * @param value The value to check
 * @returns true if the value is null or undefined
 * @example
 * isNil(null) // true
 * isNil(undefined) // true
 * isNil(0) // false
 */
export function isNil(value: unknown): value is null | undefined {
  return value === null || value === undefined;
}

/**
 * Checks if a value is not null or undefined.
 * @param value The value to check
 * @returns true if the value is not null or undefined
 * @example
 * isNotNil(0) // true
 * isNotNil('') // true
 * isNotNil(null) // false
 */
export function isNotNil<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Checks if a value is an array.
 * @param value The value to check
 * @returns true if the value is an array
 * @example
 * isArray([]) // true
 * isArray([1, 2, 3]) // true
 * isArray({}) // false
 */
export function isArray(value: unknown): value is unknown[] {
  return Array.isArray(value);
}

/**
 * Checks if a value is a string.
 * @param value The value to check
 * @returns true if the value is a string
 * @example
 * isString('') // true
 * isString('hello') // true
 * isString(123) // false
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Checks if a value is a number.
 * @param value The value to check
 * @returns true if the value is a number
 * @example
 * isNumber(0) // true
 * isNumber(123) // true
 * isNumber('123') // false
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

/**
 * Checks if a value is a boolean.
 * @param value The value to check
 * @returns true if the value is a boolean
 * @example
 * isBoolean(true) // true
 * isBoolean(false) // true
 * isBoolean(1) // false
 */
export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

/**
 * Checks if a value is a function.
 * @param value The value to check
 * @returns true if the value is a function
 * @example
 * isFunction(() => {}) // true
 * isFunction(function() {}) // true
 * isFunction({}) // false
 */
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

/**
 * Checks if a value is an object.
 * @param value The value to check
 * @returns true if the value is an object
 * @example
 * isObject({}) // true
 * isObject([]) // true
 * isObject(null) // false
 */
export function isObject(value: unknown): value is object {
  return value !== null && typeof value === 'object';
}

/**
 * Checks if a value is a plain object.
 * @param value The value to check
 * @returns true if the value is a plain object
 * @example
 * isPlainObject({}) // true
 * isPlainObject({ a: 1 }) // true
 * isPlainObject([]) // false
 */
export function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!isObject(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Checks if a value is a regular expression.
 * @param value The value to check
 * @returns true if the value is a regular expression
 * @example
 * isRegExp(/a/) // true
 * isRegExp(new RegExp('a')) // true
 * isRegExp('a') // false
 */
export function isRegExp(value: unknown): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * Checks if a value is a date.
 * @param value The value to check
 * @returns true if the value is a date
 * @example
 * isDate(new Date()) // true
 * isDate('2023-01-01') // false
 */
export function isDate(value: unknown): value is Date {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * Checks if a value is an error.
 * @param value The value to check
 * @returns true if the value is an error
 * @example
 * isError(new Error()) // true
 * isError({ message: 'error' }) // false
 */
export function isError(value: unknown): value is Error {
  return Object.prototype.toString.call(value) === '[object Error]';
}

/**
 * Checks if a value is a symbol.
 * @param value The value to check
 * @returns true if the value is a symbol
 * @example
 * isSymbol(Symbol()) // true
 * isSymbol('symbol') // false
 */
export function isSymbol(value: unknown): value is symbol {
  return typeof value === 'symbol';
}

/**
 * Checks if a value is null.
 * @param value The value to check
 * @returns true if the value is null
 * @example
 * isNull(null) // true
 * isNull(undefined) // false
 */
export function isNull(value: unknown): value is null {
  return value === null;
}

/**
 * Checks if a value is undefined.
 * @param value The value to check
 * @returns true if the value is undefined
 * @example
 * isUndefined(undefined) // true
 * isUndefined(null) // false
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}

/**
 * Checks if a value is NaN.
 * @param value The value to check
 * @returns true if the value is NaN
 * @example
 * isNaN(NaN) // true
 * isNaN(0) // false
 */
export function isNaN(value: unknown): value is number {
  return Number.isNaN(value);
}

/**
 * Checks if a value is a finite number.
 * @param value The value to check
 * @returns true if the value is a finite number
 * @example
 * isFinite(0) // true
 * isFinite(Infinity) // false
 */
export function isFinite(value: unknown): value is number {
  return Number.isFinite(value);
}

/**
 * Checks if a value is a positive number.
 * @param value The value to check
 * @returns true if the value is a positive number
 * @example
 * isPositive(1) // true
 * isPositive(0) // false
 */
export function isPositive(value: unknown): value is number {
  return isNumber(value) && value > 0;
}

/**
 * Checks if a value is a negative number.
 * @param value The value to check
 * @returns true if the value is a negative number
 * @example
 * isNegative(-1) // true
 * isNegative(0) // false
 */
export function isNegative(value: unknown): value is number {
  return isNumber(value) && value < 0;
}

/**
 * Checks if a value is zero.
 * @param value The value to check
 * @returns true if the value is zero
 * @example
 * isZero(0) // true
 * isZero(1) // false
 */
export function isZero(value: unknown): value is number {
  return isNumber(value) && value === 0;
}

/**
 * Checks if a value is an even number.
 * @param value The value to check
 * @returns true if the value is an even number
 * @example
 * isEven(2) // true
 * isEven(1) // false
 */
export function isEven(value: unknown): value is number {
  return isNumber(value) && value % 2 === 0;
}

/**
 * Checks if a value is an odd number.
 * @param value The value to check
 * @returns true if the value is an odd number
 * @example
 * isOdd(1) // true
 * isOdd(2) // false
 */
export function isOdd(value: unknown): value is number {
  return isNumber(value) && value % 2 !== 0;
}

/**
 * Checks if a value is Infinity.
 * @param value The value to check
 * @returns true if the value is Infinity
 * @example
 * isInfinity(Infinity) // true
 * isInfinity(0) // false
 */
export function isInfinity(value: unknown): value is number {
  return value === Infinity;
}

/**
 * Checks if a value is negative Infinity.
 * @param value The value to check
 * @returns true if the value is negative Infinity
 * @example
 * isNegativeInfinity(-Infinity) // true
 * isNegativeInfinity(0) // false
 */
export function isNegativeInfinity(value: unknown): value is number {
  return value === -Infinity;
}

/**
 * Checks if a value is positive Infinity.
 * @param value The value to check
 * @returns true if the value is positive Infinity
 * @example
 * isPositiveInfinity(Infinity) // true
 * isPositiveInfinity(0) // false
 */
export function isPositiveInfinity(value: unknown): value is number {
  return value === Infinity;
}

/**
 * Checks if a value is an empty string.
 * @param value The value to check
 * @returns true if the value is an empty string
 * @example
 * isEmptyString('') // true
 * isEmptyString('hello') // false
 */
export function isEmptyString(value: unknown): value is string {
  return isString(value) && value.length === 0;
}

/**
 * Checks if a value is an empty array.
 * @param value The value to check
 * @returns true if the value is an empty array
 * @example
 * isEmptyArray([]) // true
 * isEmptyArray([1]) // false
 */
export function isEmptyArray(value: unknown): value is unknown[] {
  return isArray(value) && value.length === 0;
}

/**
 * Checks if a value is an empty object.
 * @param value The value to check
 * @returns true if the value is an empty object
 * @example
 * isEmptyObject({}) // true
 * isEmptyObject({ a: 1 }) // false
 */
export function isEmptyObject(value: unknown): value is Record<string, unknown> {
  return isPlainObject(value) && Object.keys(value).length === 0;
}

/**
 * Checks if a value is a blank string.
 * @param value The value to check
 * @returns true if the value is a blank string
 * @example
 * isBlankString('') // true
 * isBlankString('  ') // true
 * isBlankString('hello') // false
 */
export function isBlankString(value: unknown): value is string {
  return isString(value) && value.trim().length === 0;
}

/**
 * Checks if a value is a numeric string.
 * @param value The value to check
 * @returns true if the value is a numeric string
 * @example
 * isNumeric('123') // true
 * isNumeric('12.34') // true
 * isNumeric('abc') // false
 */
export function isNumeric(value: unknown): value is string {
  return isString(value) && /^-?\d*\.?\d+$/.test(value);
}

/**
 * Checks if a value is an alpha string.
 * @param value The value to check
 * @returns true if the value is an alpha string
 * @example
 * isAlpha('abc') // true
 * isAlpha('ABC') // true
 * isAlpha('123') // false
 */
export function isAlpha(value: unknown): value is string {
  return isString(value) && /^[a-zA-Z]+$/.test(value);
}

/**
 * Checks if a value is an alphanumeric string.
 * @param value The value to check
 * @returns true if the value is an alphanumeric string
 * @example
 * isAlphanumeric('abc123') // true
 * isAlphanumeric('ABC123') // true
 * isAlphanumeric('abc!') // false
 */
export function isAlphanumeric(value: unknown): value is string {
  return isString(value) && /^[a-zA-Z0-9]+$/.test(value);
}

/**
 * Checks if a value is a valid email address.
 * @param value The value to check
 * @returns true if the value is a valid email address
 * @example
 * isEmail('test@example.com') // true
 * isEmail('invalid') // false
 */
export function isEmail(value: unknown): value is string {
  return isString(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/**
 * Checks if a value is a valid URL.
 * @param value The value to check
 * @returns true if the value is a valid URL
 * @example
 * isUrl('https://example.com') // true
 * isUrl('invalid') // false
 */
export function isUrl(value: unknown): value is string {
  try {
    return isString(value) && Boolean(new URL(value));
  } catch {
    return false;
  }
}

/**
 * Checks if a value is an array and all elements satisfy a predicate.
 * @param value The value to check
 * @param predicate The predicate function
 * @returns true if the value is an array and all elements satisfy the predicate
 * @example
 * isArrayOf([1, 2, 3], isNumber) // true
 * isArrayOf([1, '2', 3], isNumber) // false
 */
export function isArrayOf<T>(value: unknown, predicate: (value: unknown) => value is T): value is T[] {
  return isArray(value) && value.every(predicate);
}

/**
 * Checks if a value is array-like.
 * @param value The value to check
 * @returns true if the value is array-like
 * @example
 * isArrayLike([]) // true
 * isArrayLike({ length: 0 }) // true
 * isArrayLike({}) // false
 */
export function isArrayLike(value: unknown): value is ArrayLike<unknown> {
  return (
    value !== null &&
    typeof value === 'object' &&
    'length' in value &&
    typeof (value as any).length === 'number' &&
    (value as any).length >= 0
  );
}

/**
 * Checks if a value is a Promise.
 * @param value The value to check
 * @returns true if the value is a Promise
 * @example
 * isPromise(Promise.resolve()) // true
 * isPromise({}) // false
 */
export function isPromise(value: unknown): value is Promise<unknown> {
  return value !== null && typeof value === 'object' && 'then' in value && typeof (value as any).then === 'function';
}

/**
 * Checks if a value is iterable.
 * @param value The value to check
 * @returns true if the value is iterable
 * @example
 * isIterable([]) // true
 * isIterable('') // true
 * isIterable({}) // false
 */
export function isIterable(value: unknown): value is Iterable<unknown> {
  return value !== null && typeof (value as any)[Symbol.iterator] === 'function';
}

/**
 * Checks if a value is a generator function.
 * @param value The value to check
 * @returns true if the value is a generator function
 * @example
 * isGenerator(function* () {}) // true
 * isGenerator(() => {}) // false
 */
export function isGenerator(value: unknown): value is GeneratorFunction {
  return isFunction(value) && value.constructor.name === 'GeneratorFunction';
}

/**
 * Checks if a value is an async generator function.
 * @param value The value to check
 * @returns true if the value is an async generator function
 * @example
 * isAsyncGenerator(async function* () {}) // true
 * isAsyncGenerator(function* () {}) // false
 */
export function isAsyncGenerator(value: unknown): value is AsyncGeneratorFunction {
  return isFunction(value) && value.constructor.name === 'AsyncGeneratorFunction';
}

/**
 * Checks if a value is a generator function (either sync or async).
 * @param value The value to check
 * @returns true if the value is a generator function
 * @example
 * isGenericGenerator(function* () {}) // true
 * isGenericGenerator(async function* () {}) // true
 * isGenericGenerator(() => {}) // false
 */
export function isGenericGenerator(value: unknown): value is GeneratorFunction | AsyncGeneratorFunction {
  return isFunction(value) && (value.constructor.name === 'GeneratorFunction' || value.constructor.name === 'AsyncGeneratorFunction');
}

/**
 * Checks if a value is an integer.
 * @param value The value to check
 * @returns true if the value is an integer
 * @example
 * isInteger(1) // true
 * isInteger(1.0) // true
 * isInteger(1.1) // false
 * isInteger('1') // false
 */
export function isInteger(value: unknown): value is number {
  return isNumber(value) && Number.isInteger(value);
}

/**
 * Checks if a value is a float number.
 * @param value The value to check
 * @returns true if the value is a float number
 * @example
 * isFloat(1.1) // true
 * isFloat(1.0) // false
 * isFloat(1) // false
 * isFloat('1.1') // false
 * isFloat(Infinity) // false
 */
export function isFloat(value: unknown): value is number {
  return isNumber(value) && !Number.isInteger(value);
}
