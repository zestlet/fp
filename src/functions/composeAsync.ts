import type { Awaitable, AwaitableFunction, FirstFn } from '../shared/types/Function';

export function composeAsync(): <T>(x: T) => Awaitable<T>;
export function composeAsync<Args extends readonly any[], R1>(f1: AwaitableFunction<Args, R1>): AwaitableFunction<Args, Awaited<R1>>;
export function composeAsync<Args extends readonly any[], R1, R2>(
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R2>;
export function composeAsync<Args extends readonly any[], R1, R2, R3>(
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R3>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4>(
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R4>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5>(
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R5>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6>(
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R6>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7>(
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R7>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8>(
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R8>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R9>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R10>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R11>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R12>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R13>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R14>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R15>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
  f16: AwaitableFunction<[Awaited<R15>], R16>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R16>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
  f17: AwaitableFunction<[Awaited<R16>], R17>,
  f16: AwaitableFunction<[Awaited<R15>], R16>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R17>;
export function composeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
  f18: AwaitableFunction<[Awaited<R17>], R18>,
  f17: AwaitableFunction<[Awaited<R16>], R17>,
  f16: AwaitableFunction<[Awaited<R15>], R16>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R18>;
export function composeAsync<
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
>(
  f19: AwaitableFunction<[Awaited<R18>], R19>,
  f18: AwaitableFunction<[Awaited<R17>], R18>,
  f17: AwaitableFunction<[Awaited<R16>], R17>,
  f16: AwaitableFunction<[Awaited<R15>], R16>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R19>;
export function composeAsync<
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
  f20: AwaitableFunction<[Awaited<R19>], R20>,
  f19: AwaitableFunction<[Awaited<R18>], R19>,
  f18: AwaitableFunction<[Awaited<R17>], R18>,
  f17: AwaitableFunction<[Awaited<R16>], R17>,
  f16: AwaitableFunction<[Awaited<R15>], R16>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f1: AwaitableFunction<Args, R1>
): AwaitableFunction<Args, R20>;

export function composeAsync<Args extends readonly any[], Fns extends readonly AwaitableFunction[]>(
  ...fns: Fns
): AwaitableFunction<Args, ReturnType<FirstFn<Fns>>>;
export function composeAsync(...fns: any[]): any {
  if (fns.length === 0) {
    return async <T>(x: T) => x;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return async (arg: any) => {
    let result = arg;
    for (let i = fns.length - 1; i >= 0; i--) {
      result = await fns[i](result);
    }
    return result;
  };
}
