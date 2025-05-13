import { describe, expect, it } from 'vitest';
import { True } from './True';

describe('True', () => {
  it('应该返回 true', () => {
    expect(True()).toBe(true);
  });

  it('应该总是返回 true', () => {
    expect(True()).toBe(true);
    expect(True()).toBe(true);
    expect(True()).toBe(true);
  });
});
