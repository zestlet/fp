import type { LastFn, Awaitable, AwaitableFunction } from '../shared/types/Function';

export function pipeAsync(): <T>(x: T) => Awaitable<T>;
export function pipeAsync<R1 extends AwaitableFunction>(f1: R1): R1;
export function pipeAsync<Args extends readonly any[], R1, R2>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>
): AwaitableFunction<Args, R2>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>
): AwaitableFunction<Args, R3>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>
): AwaitableFunction<Args, R4>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>
): AwaitableFunction<Args, R5>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>
): AwaitableFunction<Args, R6>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>
): AwaitableFunction<Args, R7>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>
): AwaitableFunction<Args, R8>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>
): AwaitableFunction<Args, R9>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>
): AwaitableFunction<Args, R10>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>
): AwaitableFunction<Args, R11>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f12: AwaitableFunction<[Awaited<R11>], R12>
): AwaitableFunction<Args, R12>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f13: AwaitableFunction<[Awaited<R12>], R13>
): AwaitableFunction<Args, R13>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f14: AwaitableFunction<[Awaited<R13>], R14>
): AwaitableFunction<Args, R14>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f15: AwaitableFunction<[Awaited<R14>], R15>
): AwaitableFunction<Args, R15>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f16: AwaitableFunction<[Awaited<R15>], R16>
): AwaitableFunction<Args, R16>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f16: AwaitableFunction<[Awaited<R15>], R16>,
  f17: AwaitableFunction<[Awaited<R16>], R17>
): AwaitableFunction<Args, R17>;
export function pipeAsync<Args extends readonly any[], R1, R2, R3, R4, R5, R6, R7, R8, R9, R10, R11, R12, R13, R14, R15, R16, R17, R18>(
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f16: AwaitableFunction<[Awaited<R15>], R16>,
  f17: AwaitableFunction<[Awaited<R16>], R17>,
  f18: AwaitableFunction<[Awaited<R17>], R18>
): AwaitableFunction<Args, R18>;
export function pipeAsync<
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
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f16: AwaitableFunction<[Awaited<R15>], R16>,
  f17: AwaitableFunction<[Awaited<R16>], R17>,
  f18: AwaitableFunction<[Awaited<R17>], R18>,
  f19: AwaitableFunction<[Awaited<R18>], R19>
): AwaitableFunction<Args, R19>;
export function pipeAsync<
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
  f1: AwaitableFunction<Args, R1>,
  f2: AwaitableFunction<[Awaited<R1>], R2>,
  f3: AwaitableFunction<[Awaited<R2>], R3>,
  f4: AwaitableFunction<[Awaited<R3>], R4>,
  f5: AwaitableFunction<[Awaited<R4>], R5>,
  f6: AwaitableFunction<[Awaited<R5>], R6>,
  f7: AwaitableFunction<[Awaited<R6>], R7>,
  f8: AwaitableFunction<[Awaited<R7>], R8>,
  f9: AwaitableFunction<[Awaited<R8>], R9>,
  f10: AwaitableFunction<[Awaited<R9>], R10>,
  f11: AwaitableFunction<[Awaited<R10>], R11>,
  f12: AwaitableFunction<[Awaited<R11>], R12>,
  f13: AwaitableFunction<[Awaited<R12>], R13>,
  f14: AwaitableFunction<[Awaited<R13>], R14>,
  f15: AwaitableFunction<[Awaited<R14>], R15>,
  f16: AwaitableFunction<[Awaited<R15>], R16>,
  f17: AwaitableFunction<[Awaited<R16>], R17>,
  f18: AwaitableFunction<[Awaited<R17>], R18>,
  f19: AwaitableFunction<[Awaited<R18>], R19>,
  f20: AwaitableFunction<[Awaited<R19>], R20>
): AwaitableFunction<Args, R20>;

export function pipeAsync<Args extends readonly any[], Fns extends readonly AwaitableFunction[]>(
  ...fns: Fns
): AwaitableFunction<Args, ReturnType<LastFn<Fns>>>;
export function pipeAsync(...fns: any[]): any {
  if (fns.length === 0) {
    return async <T>(x: T) => x;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return async (arg: any) => {
    let result = arg;
    for (const fn of fns) {
      result = await fn(result);
    }
    return result;
  };
}
