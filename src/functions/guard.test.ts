import { describe, expect, it } from 'vitest';
import {
  isNil,
  isNotNil,
  isArray,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isPlainObject,
  isRegExp,
  isDate,
  isError,
  isSymbol,
  isNull,
  isUndefined,
  isNaN,
  isFinite,
  isPositive,
  isNegative,
  isZero,
  isEven,
  isOdd,
  isInfinity,
  isNegativeInfinity,
  isPositiveInfinity,
  isEmptyString,
  isEmptyArray,
  isBlankString,
  isNumeric,
  isAlpha,
  isAlphanumeric,
  isEmail,
  isUrl,
  isArrayOf,
  isArrayLike,
  isPromise,
  isIterable,
  isGenerator,
  isAsyncGenerator,
  isGenericGenerator,
  isInteger,
  isFloat,
} from './guard';

describe('Guard functions', () => {
  describe('isNil', () => {
    it('应该正确识别 null 和 undefined', () => {
      expect(isNil(null)).toBe(true);
      expect(isNil(undefined)).toBe(true);
      expect(isNil(0)).toBe(false);
      expect(isNil('')).toBe(false);
      expect(isNil(false)).toBe(false);
    });
  });

  describe('isNotNil', () => {
    it('应该正确识别非 null 和非 undefined 的值', () => {
      expect(isNotNil(0)).toBe(true);
      expect(isNotNil('')).toBe(true);
      expect(isNotNil(false)).toBe(true);
      expect(isNotNil(null)).toBe(false);
      expect(isNotNil(undefined)).toBe(false);
    });
  });

  describe('isArray', () => {
    it('应该正确识别数组', () => {
      expect(isArray([])).toBe(true);
      expect(isArray([1, 2, 3])).toBe(true);
      expect(isArray(new Array())).toBe(true);
      expect(isArray({})).toBe(false);
      expect(isArray(null)).toBe(false);
    });
  });

  describe('isString', () => {
    it('应该正确识别字符串', () => {
      expect(isString('')).toBe(true);
      expect(isString('hello')).toBe(true);
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString(new String())).toBe(false);
    });
  });

  describe('isNumber', () => {
    it('应该正确识别数字', () => {
      expect(isNumber(0)).toBe(true);
      expect(isNumber(123)).toBe(true);
      expect(isNumber(-123)).toBe(true);
      expect(isNumber(0.123)).toBe(true);
      expect(isNumber(NaN)).toBe(false);
      expect(isNumber('123')).toBe(false);
    });
  });

  describe('isBoolean', () => {
    it('应该正确识别布尔值', () => {
      expect(isBoolean(true)).toBe(true);
      expect(isBoolean(false)).toBe(true);
      expect(isBoolean(1)).toBe(false);
      expect(isBoolean('true')).toBe(false);
      expect(isBoolean(new Boolean())).toBe(false);
    });
  });

  describe('isFunction', () => {
    it('应该正确识别函数', () => {
      expect(isFunction(() => {})).toBe(true);
      expect(isFunction(function () {})).toBe(true);
      expect(isFunction(async () => {})).toBe(true);
      expect(isFunction({})).toBe(false);
      expect(isFunction(null)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('应该正确识别对象', () => {
      expect(isObject({})).toBe(true);
      expect(isObject([])).toBe(true);
      expect(isObject(new Date())).toBe(true);
      expect(isObject(null)).toBe(false);
      expect(isObject(undefined)).toBe(false);
    });
  });

  describe('isPlainObject', () => {
    it('应该正确识别纯对象', () => {
      expect(isPlainObject({})).toBe(true);
      expect(isPlainObject({ a: 1 })).toBe(true);
      expect(isPlainObject(Object.create(null))).toBe(true);
      expect(isPlainObject([])).toBe(false);
      expect(isPlainObject(new Date())).toBe(false);
    });
  });

  describe('isRegExp', () => {
    it('应该正确识别正则表达式', () => {
      expect(isRegExp(/a/)).toBe(true);
      expect(isRegExp(new RegExp('a'))).toBe(true);
      expect(isRegExp('a')).toBe(false);
      expect(isRegExp({})).toBe(false);
    });
  });

  describe('isDate', () => {
    it('应该正确识别日期', () => {
      expect(isDate(new Date())).toBe(true);
      expect(isDate(new Date('2023-01-01'))).toBe(true);
      expect(isDate('2023-01-01')).toBe(false);
      expect(isDate({})).toBe(false);
    });
  });

  describe('isError', () => {
    it('应该正确识别错误', () => {
      expect(isError(new Error())).toBe(true);
      expect(isError(new TypeError())).toBe(true);
      expect(isError({ message: 'error' })).toBe(false);
      expect(isError('error')).toBe(false);
    });
  });

  describe('isSymbol', () => {
    it('应该正确识别 Symbol', () => {
      expect(isSymbol(Symbol())).toBe(true);
      expect(isSymbol(Symbol('test'))).toBe(true);
      expect(isSymbol('symbol')).toBe(false);
      expect(isSymbol({})).toBe(false);
    });
  });

  describe('isNull', () => {
    it('应该正确识别 null', () => {
      expect(isNull(null)).toBe(true);
      expect(isNull(undefined)).toBe(false);
      expect(isNull(0)).toBe(false);
      expect(isNull('')).toBe(false);
    });
  });

  describe('isUndefined', () => {
    it('应该正确识别 undefined', () => {
      expect(isUndefined(undefined)).toBe(true);
      expect(isUndefined(null)).toBe(false);
      expect(isUndefined(0)).toBe(false);
      expect(isUndefined('')).toBe(false);
    });
  });

  describe('isNaN', () => {
    it('应该正确识别 NaN', () => {
      expect(isNaN(NaN)).toBe(true);
      expect(isNaN(0)).toBe(false);
      expect(isNaN('NaN')).toBe(false);
      expect(isNaN({})).toBe(false);
    });
  });

  describe('isFinite', () => {
    it('应该正确识别有限数', () => {
      expect(isFinite(0)).toBe(true);
      expect(isFinite(123)).toBe(true);
      expect(isFinite(-123)).toBe(true);
      expect(isFinite(Infinity)).toBe(false);
      expect(isFinite(-Infinity)).toBe(false);
    });
  });

  describe('isPositive', () => {
    it('应该正确识别正数', () => {
      expect(isPositive(1)).toBe(true);
      expect(isPositive(0.1)).toBe(true);
      expect(isPositive(0)).toBe(false);
      expect(isPositive(-1)).toBe(false);
    });
  });

  describe('isNegative', () => {
    it('应该正确识别负数', () => {
      expect(isNegative(-1)).toBe(true);
      expect(isNegative(-0.1)).toBe(true);
      expect(isNegative(0)).toBe(false);
      expect(isNegative(1)).toBe(false);
    });
  });

  describe('isZero', () => {
    it('应该正确识别零', () => {
      expect(isZero(0)).toBe(true);
      expect(isZero(-0)).toBe(true);
      expect(isZero(1)).toBe(false);
      expect(isZero(-1)).toBe(false);
    });
  });

  describe('isEven', () => {
    it('应该正确识别偶数', () => {
      expect(isEven(0)).toBe(true);
      expect(isEven(2)).toBe(true);
      expect(isEven(-2)).toBe(true);
      expect(isEven(1)).toBe(false);
      expect(isEven(-1)).toBe(false);
    });
  });

  describe('isOdd', () => {
    it('应该正确识别奇数', () => {
      expect(isOdd(1)).toBe(true);
      expect(isOdd(-1)).toBe(true);
      expect(isOdd(0)).toBe(false);
      expect(isOdd(2)).toBe(false);
      expect(isOdd(-2)).toBe(false);
    });
  });

  describe('isInfinity', () => {
    it('应该正确识别 Infinity', () => {
      expect(isInfinity(Infinity)).toBe(true);
      expect(isInfinity(-Infinity)).toBe(false);
      expect(isInfinity(0)).toBe(false);
      expect(isInfinity('Infinity')).toBe(false);
    });
  });

  describe('isNegativeInfinity', () => {
    it('应该正确识别负 Infinity', () => {
      expect(isNegativeInfinity(-Infinity)).toBe(true);
      expect(isNegativeInfinity(Infinity)).toBe(false);
      expect(isNegativeInfinity(0)).toBe(false);
      expect(isNegativeInfinity('-Infinity')).toBe(false);
    });
  });

  describe('isPositiveInfinity', () => {
    it('应该正确识别正 Infinity', () => {
      expect(isPositiveInfinity(Infinity)).toBe(true);
      expect(isPositiveInfinity(-Infinity)).toBe(false);
      expect(isPositiveInfinity(0)).toBe(false);
      expect(isPositiveInfinity('Infinity')).toBe(false);
    });
  });

  describe('isEmptyString', () => {
    it('应该正确识别空字符串', () => {
      expect(isEmptyString('')).toBe(true);
      expect(isEmptyString(' ')).toBe(false);
      expect(isEmptyString('hello')).toBe(false);
      expect(isEmptyString(123)).toBe(false);
    });
  });

  describe('isEmptyArray', () => {
    it('应该正确识别空数组', () => {
      expect(isEmptyArray([])).toBe(true);
      expect(isEmptyArray([1])).toBe(false);
      expect(isEmptyArray({})).toBe(false);
      expect(isEmptyArray(null)).toBe(false);
    });
  });

  describe('isBlankString', () => {
    it('应该正确识别空白字符串', () => {
      expect(isBlankString('')).toBe(true);
      expect(isBlankString(' ')).toBe(true);
      expect(isBlankString('\t')).toBe(true);
      expect(isBlankString('\n')).toBe(true);
      expect(isBlankString('hello')).toBe(false);
      expect(isBlankString(123)).toBe(false);
    });
  });

  describe('isNumeric', () => {
    it('应该正确识别数字字符串', () => {
      expect(isNumeric('123')).toBe(true);
      expect(isNumeric('-123')).toBe(true);
      expect(isNumeric('0.123')).toBe(true);
      expect(isNumeric('abc')).toBe(false);
      expect(isNumeric('12.34.56')).toBe(false);
    });
  });

  describe('isAlpha', () => {
    it('应该正确识别字母字符串', () => {
      expect(isAlpha('abc')).toBe(true);
      expect(isAlpha('ABC')).toBe(true);
      expect(isAlpha('abcABC')).toBe(true);
      expect(isAlpha('123')).toBe(false);
      expect(isAlpha('abc123')).toBe(false);
    });
  });

  describe('isAlphanumeric', () => {
    it('应该正确识别字母数字字符串', () => {
      expect(isAlphanumeric('abc123')).toBe(true);
      expect(isAlphanumeric('ABC123')).toBe(true);
      expect(isAlphanumeric('123abc')).toBe(true);
      expect(isAlphanumeric('abc!')).toBe(false);
      expect(isAlphanumeric('123!')).toBe(false);
    });
  });

  describe('isEmail', () => {
    it('应该正确识别邮箱地址', () => {
      expect(isEmail('test@example.com')).toBe(true);
      expect(isEmail('test.name@example.com')).toBe(true);
      expect(isEmail('test+name@example.com')).toBe(true);
      expect(isEmail('test@example')).toBe(false);
      expect(isEmail('test@.com')).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('应该正确识别 URL', () => {
      expect(isUrl('https://example.com')).toBe(true);
      expect(isUrl('http://example.com')).toBe(true);
      expect(isUrl('https://example.com/path')).toBe(true);
      expect(isUrl('https://example.com/path?query=1')).toBe(true);
      expect(isUrl('not-a-url')).toBe(false);
      expect(isUrl('http://')).toBe(false);
    });
  });

  describe('isArrayOf', () => {
    it('应该正确识别满足条件的数组', () => {
      expect(isArrayOf([1, 2, 3], isNumber)).toBe(true);
      expect(isArrayOf(['a', 'b', 'c'], isString)).toBe(true);
      expect(isArrayOf([1, '2', 3], isNumber)).toBe(false);
      expect(isArrayOf([1, 2, 3], isString)).toBe(false);
    });
  });

  describe('isArrayLike', () => {
    it('应该正确识别类数组对象', () => {
      expect(isArrayLike([])).toBe(true);
      expect(isArrayLike({ length: 0 })).toBe(true);
      expect(isArrayLike({ length: 3 })).toBe(true);
      expect(isArrayLike({})).toBe(false);
      expect(isArrayLike(null)).toBe(false);
    });
  });

  describe('isPromise', () => {
    it('应该正确识别 Promise', () => {
      expect(isPromise(Promise.resolve())).toBe(true);
      expect(isPromise(new Promise(() => {}))).toBe(true);
      expect(isPromise({ then: () => {} })).toBe(true);
      expect(isPromise({})).toBe(false);
      expect(isPromise(null)).toBe(false);
    });
  });

  describe('isIterable', () => {
    it('应该正确识别可迭代对象', () => {
      expect(isIterable([])).toBe(true);
      expect(isIterable('')).toBe(true);
      expect(isIterable(new Map())).toBe(true);
      expect(isIterable(new Set())).toBe(true);
      expect(isIterable({})).toBe(false);
      expect(isIterable(null)).toBe(false);
    });
  });

  describe('isGenerator', () => {
    it('应该正确识别生成器函数', () => {
      expect(isGenerator(function* () {})).toBe(true);
      expect(isGenerator(() => {})).toBe(false);
      expect(isGenerator(function () {})).toBe(false);
      expect(isGenerator(async function* () {})).toBe(false);
    });
  });

  describe('isAsyncGenerator', () => {
    it('应该正确识别异步生成器函数', () => {
      expect(isAsyncGenerator(async function* () {})).toBe(true);
      expect(isAsyncGenerator(function* () {})).toBe(false);
      expect(isAsyncGenerator(() => {})).toBe(false);
      expect(isAsyncGenerator(function () {})).toBe(false);
    });
  });

  describe('isGenericGenerator', () => {
    it('应该正确识别生成器函数（同步或异步）', () => {
      expect(isGenericGenerator(function* () {})).toBe(true);
      expect(isGenericGenerator(async function* () {})).toBe(true);
      expect(isGenericGenerator(() => {})).toBe(false);
      expect(isGenericGenerator(function () {})).toBe(false);
    });
  });

  describe('isInteger', () => {
    it('应该正确识别整数', () => {
      expect(isInteger(1)).toBe(true);
      expect(isInteger(0)).toBe(true);
      expect(isInteger(-1)).toBe(true);
      expect(isInteger(1.0)).toBe(true);
      expect(isInteger(1.1)).toBe(false);
      expect(isInteger('1')).toBe(false);
      expect(isInteger(NaN)).toBe(false);
      expect(isInteger(Infinity)).toBe(false);
    });
  });

  describe('isFloat', () => {
    it('应该正确识别浮点数', () => {
      expect(isFloat(1.1)).toBe(true);
      expect(isFloat(-1.1)).toBe(true);
      expect(isFloat(0.1)).toBe(true);
      expect(isFloat(1.0)).toBe(false);
      expect(isFloat(1)).toBe(false);
      expect(isFloat('1.1')).toBe(false);
      expect(isFloat(NaN)).toBe(false);
      expect(isFloat(Infinity)).toBe(true);
      expect(isFloat(-Infinity)).toBe(true);
    });
  });
});
