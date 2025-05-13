import { curry } from './curry';

function rangeImpl(start: number, end: number, step: number): number[] {
  if (step === 0) return [];
  const length = Math.max(Math.ceil((end - start) / step), 0);

  const result: number[] = Array(length);

  let idx = 0;
  let value = start;

  if (step > 0) {
    while (value < end) {
      result[idx++] = value;
      value += step;
    }
  } else {
    while (value > end) {
      result[idx++] = value;
      value += step;
    }
  }

  return result;
}

/**
 * Creates an array of numbers from start to end (exclusive) with optional step
 *
 * @category Array
 * @param from - The start of the range (inclusive)
 * @param to - The end of the range (exclusive)
 * @param step - The step between numbers (default: 1)
 * @returns Returns an array of numbers
 * @example
 * range(0, 5); // [0, 1, 2, 3, 4]
 * range(0, 5, 2); // [0, 2, 4]
 * range(5, 0, -1); // [5, 4, 3, 2, 1]
 */
export const range = curry(rangeImpl) as {
  (from: number, to: number, step: number): number[];
  (from: number, to: number): (step: number) => number[];
  (from: number): {
    (to: number, step: number): number[];
    (to: number): (step: number) => number[];
  };
};
