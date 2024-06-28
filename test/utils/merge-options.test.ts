import { mergeOptions } from '../../src/utils/merge-options';

describe('mergeOptions', () => {
  it('should merge two objects with non-overlapping keys', () => {
    const obj1: Record<string, unknown> = { a: 1, b: 2 };
    const obj2: Record<string, unknown> = { c: 3, d: 4 };
    const result = mergeOptions(obj1, obj2);

    expect(result).toEqual({
      a: 1,
      b: 2,
      c: 3,
      d: 4,
    });
  });

  it('should merge two objects with overlapping keys', () => {
    const obj1: Record<string, unknown> = { a: 1, b: 2, c: [1, 2] };
    const obj2: Record<string, unknown> = { c: [3, 4], d: 4 };
    const result = mergeOptions(obj1, obj2);

    expect(result).toEqual({
      a: 1,
      b: 2,
      c: [1, 2, 3, 4],
      d: 4,
    });
  });

  it('should merge nested objects', () => {
    const obj1: Record<string, unknown> = { a: { b: 1, c: 2 } };
    const obj2 = { a: { c: 3, d: 4 } };
    const result = mergeOptions(obj1, obj2);

    expect(result).toEqual({ a: { b: 1, c: 3, d: 4 } });
  });

  it('should merge nested arrays', () => {
    const obj1: Record<string, unknown> = { a: [1, 2] };
    const obj2: Record<string, unknown> = { a: [3, 4] };
    const result = mergeOptions(obj1, obj2);

    expect(result).toEqual({ a: [1, 2, 3, 4] });
  });

  it('should not merge undefined', () => {
    const obj1: Record<string, unknown> = { a: 1, b: 2 };
    const obj2 = undefined;
    const result = mergeOptions(obj1, obj2);

    expect(result).toEqual({ a: 1, b: 2 });
  });
});
