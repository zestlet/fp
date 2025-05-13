import { ArrayContainer } from '../shared/types/Array';

function tallyImpl<T>(array: ArrayContainer<T>): Map<T, number> {
  return array.reduce<Map<T, number>>((acc, val) => {
    acc.set(val, (acc.get(val) || 0) + 1);
    return acc;
  }, new Map<T, number>());
}

export const tally = tallyImpl;
