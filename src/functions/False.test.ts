import { describe, expect, it } from 'vitest';
import { False } from './False';

describe('False', () => {
  it('应该返回 false', () => {
    expect(False()).toBe(false);
  });

  it('应该总是返回 false', () => {
    expect(False()).toBe(false);
    expect(False()).toBe(false);
    expect(False()).toBe(false);
  });
});
