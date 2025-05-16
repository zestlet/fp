import type { AnyFunction, LastFn } from '../shared/types/Function';

export function flow(): <T>(x: T) => T;
export function flow<A extends AnyFunction>(a: A): A;
export function flow<Args extends readonly any[], R1, R2>(f1: (...arg: Args) => R1, f2: (arg: R1) => R2): (...arg: Args) => R2;
export function flow<Args extends readonly any[], R1, R2, R3>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3
): (...arg: Args) => R3;
export function flow<Args extends readonly any[], R1, R2, R3, R4>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4
): (...arg: Args) => R4;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5
): (...arg: Args) => R5;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6
): (...arg: Args) => R6;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7
): (...arg: Args) => R7;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8
): (...arg: Args) => R8;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9
): (...arg: Args) => R9;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10
): (...arg: Args) => R10;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11
): (...arg: Args) => R11;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11,
  f12: (arg: R11) => R12
): (...arg: Args) => R12;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11,
  f12: (arg: R11) => R12,
  f13: (arg: R12) => R13
): (...arg: Args) => R13;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11,
  f12: (arg: R11) => R12,
  f13: (arg: R12) => R13,
  f14: (arg: R13) => R14
): (...arg: Args) => R14;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11,
  f12: (arg: R11) => R12,
  f13: (arg: R12) => R13,
  f14: (arg: R13) => R14,
  f15: (arg: R14) => R15
): (...arg: Args) => R15;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11,
  f12: (arg: R11) => R12,
  f13: (arg: R12) => R13,
  f14: (arg: R13) => R14,
  f15: (arg: R14) => R15,
  f16: (arg: R15) => R16
): (...arg: Args) => R16;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11,
  f12: (arg: R11) => R12,
  f13: (arg: R12) => R13,
  f14: (arg: R13) => R14,
  f15: (arg: R14) => R15,
  f16: (arg: R15) => R16,
  f17: (arg: R16) => R17
): (...arg: Args) => R17;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11,
  f12: (arg: R11) => R12,
  f13: (arg: R12) => R13,
  f14: (arg: R13) => R14,
  f15: (arg: R14) => R15,
  f16: (arg: R15) => R16,
  f17: (arg: R16) => R17,
  f18: (arg: R17) => R18
): (...arg: Args) => R18;
export function flow<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11,
  f12: (arg: R11) => R12,
  f13: (arg: R12) => R13,
  f14: (arg: R13) => R14,
  f15: (arg: R14) => R15,
  f16: (arg: R15) => R16,
  f17: (arg: R16) => R17,
  f18: (arg: R17) => R18,
  f19: (arg: R18) => R19
): (...arg: Args) => R19;
export function flow<
  Args extends readonly any[],
  R1,
  R2,
  R3,
  R4,
  R5,
  R6,
  R7,
  R8,
  R9,
  R10,
  R11,
  R12,
  R13,
  R14,
  R15,
  R16,
  R17,
  R18,
  R19,
  R20,
>(
  f1: (...arg: Args) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10,
  f11: (arg: R10) => R11,
  f12: (arg: R11) => R12,
  f13: (arg: R12) => R13,
  f14: (arg: R13) => R14,
  f15: (arg: R14) => R15,
  f16: (arg: R15) => R16,
  f17: (arg: R16) => R17,
  f18: (arg: R17) => R18,
  f19: (arg: R18) => R19,
  f20: (arg: R19) => R20
): (...arg: Args) => R20;

export function flow<Args extends readonly any[], Fns extends readonly AnyFunction[]>(
  f1: (...args: Args) => any,
  ...fns: Fns
): (...args: Args) => ReturnType<LastFn<Fns>>;
export function flow(...fns: AnyFunction[]): AnyFunction {
  if (fns.length === 0) {
    return (x: unknown) => x;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  const [firstFn, ...restFns] = fns;

  return function piped(this: any, ...args: unknown[]) {
    return restFns.reduce((result, fn) => fn(result), firstFn(...args));
  };
}
