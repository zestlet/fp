import { ArrayContainer } from '../shared/types/Array';

function shuffleImpl<T>(array: ArrayContainer<T>): T[] {
  const result: T[] = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Randomly shuffles the array using the Fisher-Yates algorithm
 *
 * @category Array
 * @param array - The array to shuffle
 * @returns Returns a new array with elements in random order
 * @example
 * const array = [1, 2, 3, 4, 5];
 * shuffle(array); // [3, 1, 5, 2, 4] (random order)
 */
export const shuffle = shuffleImpl;
