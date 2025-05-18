import type { AnyFunction, LastFn } from '../shared/types/Function';

export function pipe<A>(data: A): A;
export function pipe<Data, R1>(data: Data, f1: (arg: Data) => R1): R1;
export function pipe<Data, R1, R2>(data: Data, f1: (data: Data) => R1, f2: (arg: R1) => R2): R2;
export function pipe<Data, R1, R2, R3>(data: Data, f1: (data: Data) => R1, f2: (arg: R1) => R2, f3: (arg: R2) => R3): R3;
export function pipe<Data, R1, R2, R3, R4>(
  data: Data,
  f1: (data: Data) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4
): R4;
export function pipe<Data, R1, R2, R3, R4, R5>(
  data: Data,
  f1: (data: Data) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5
): R5;
export function pipe<Data, R1, R2, R3, R4, R5, R6>(
  data: Data,
  f1: (data: Data) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6
): R6;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7>(
  data: Data,
  f1: (data: Data) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7
): R7;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8>(
  data: Data,
  f1: (data: Data) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8
): R8;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  data: Data,
  f1: (data: Data) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9
): R9;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  data: Data,
  f1: (data: Data) => R1,
  f2: (arg: R1) => R2,
  f3: (arg: R2) => R3,
  f4: (arg: R3) => R4,
  f5: (arg: R4) => R5,
  f6: (arg: R5) => R6,
  f7: (arg: R6) => R7,
  f8: (arg: R7) => R8,
  f9: (arg: R8) => R9,
  f10: (arg: R9) => R10
): R10;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  data: Data,
  f1: (data: Data) => R1,
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
): R11;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  data: Data,
  f1: (data: Data) => R1,
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
): R12;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  data: Data,
  f1: (data: Data) => R1,
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
): R13;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  data: Data,
  f1: (data: Data) => R1,
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
): R14;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  data: Data,
  f1: (data: Data) => R1,
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
): R15;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
  data: Data,
  f1: (data: Data) => R1,
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
): R16;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
  data: Data,
  f1: (data: Data) => R1,
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
): R17;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
  data: Data,
  f1: (data: Data) => R1,
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
): R18;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19>(
  data: Data,
  f1: (data: Data) => R1,
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
): R19;
export function pipe<Data, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18, R19, R20>(
  data: Data,
  f1: (data: Data) => R1,
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
): R20;
export function pipe(data: any, ...fns: AnyFunction[]): AnyFunction {
  if (fns.length === 0) {
    return data;
  }

  return fns.reduce((result, fn) => fn(result), data);
}
