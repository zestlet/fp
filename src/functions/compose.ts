import type { AnyFunction, FirstFn } from '../shared/types/Function';

export function compose(): <T>(x: T) => T;
export function compose<Args extends readonly any[], R1>(f1: (...args: Args) => R1): (...args: Args) => R1;
export function compose<Args extends readonly any[], R1, R2>(f2: (x: R1) => R2, f1: (...args: Args) => R1): (...args: Args) => R2;
export function compose<Args extends readonly any[], R1, R2, R3>(
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R3;
export function compose<Args extends readonly any[], R1, R2, R3, R4>(
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R4;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5>(
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R5;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6>(
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R6;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7>(
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R7;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8>(
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R8;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R9;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R10;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R11;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  f12: (x: R11) => R12,
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R12;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  f13: (x: R12) => R13,
  f12: (x: R11) => R12,
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R13;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  f14: (x: R13) => R14,
  f13: (x: R12) => R13,
  f12: (x: R11) => R12,
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R14;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  f15: (x: R14) => R15,
  f14: (x: R13) => R14,
  f13: (x: R12) => R13,
  f12: (x: R11) => R12,
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R15;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
  f16: (x: R15) => R16,
  f15: (x: R14) => R15,
  f14: (x: R13) => R14,
  f13: (x: R12) => R13,
  f12: (x: R11) => R12,
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R16;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
  f17: (x: R16) => R17,
  f16: (x: R15) => R16,
  f15: (x: R14) => R15,
  f14: (x: R13) => R14,
  f13: (x: R12) => R13,
  f12: (x: R11) => R12,
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R17;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
  f18: (x: R17) => R18,
  f17: (x: R16) => R17,
  f16: (x: R15) => R16,
  f15: (x: R14) => R15,
  f14: (x: R13) => R14,
  f13: (x: R12) => R13,
  f12: (x: R11) => R12,
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R18;
export function compose<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(
  f19: (x: R18) => R19,
  f18: (x: R17) => R18,
  f17: (x: R16) => R17,
  f16: (x: R15) => R16,
  f15: (x: R14) => R15,
  f14: (x: R13) => R14,
  f13: (x: R12) => R13,
  f12: (x: R11) => R12,
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R19;
export function compose<
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
  f20: (x: R19) => R20,
  f19: (x: R18) => R19,
  f18: (x: R17) => R18,
  f17: (x: R16) => R17,
  f16: (x: R15) => R16,
  f15: (x: R14) => R15,
  f14: (x: R13) => R14,
  f13: (x: R12) => R13,
  f12: (x: R11) => R12,
  f11: (x: R10) => R11,
  f10: (x: R9) => R10,
  f9: (x: R8) => R9,
  f8: (x: R7) => R8,
  f7: (x: R6) => R7,
  f6: (x: R5) => R6,
  f5: (x: R4) => R5,
  f4: (x: R3) => R4,
  f3: (x: R2) => R3,
  f2: (x: R1) => R2,
  f1: (...args: Args) => R1
): (...args: Args) => R20;

export function compose<Args extends readonly any[], Fns extends readonly AnyFunction[]>(
  ...fns: Fns
): (...args: Args) => ReturnType<FirstFn<Fns>>;
export function compose(...fns: any[]): any {
  if (fns.length === 0) {
    return (x: any) => x;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return (x: any) => {
    let result = x;
    for (let i = fns.length - 1; i >= 0; i--) {
      result = fns[i](result);
    }
    return result;
  };
}
