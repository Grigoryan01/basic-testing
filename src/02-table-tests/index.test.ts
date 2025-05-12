import { simpleCalculator, Action } from './index';

describe('simpleCalculator - table tests', () => {
  const validCases = [
    { a: 1, b: 2, action: Action.Add, expected: 3 },
    { a: 5, b: 3, action: Action.Subtract, expected: 2 },
    { a: 4, b: 2, action: Action.Multiply, expected: 8 },
    { a: 9, b: 3, action: Action.Divide, expected: 3 },
    { a: 2, b: 4, action: Action.Exponentiate, expected: 16 },
  ];

  test.each(validCases)(
    'returns $expected for $a $action $b',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toBe(expected);
    }
  );

  const invalidCases = [
    {
      name: 'invalid action',
      input: { a: 2, b: 3, action: 'unknown' },
    },
    {
      name: 'non-number a',
      input: { a: 'x', b: 2, action: Action.Add },
    },
    {
      name: 'non-number b',
      input: { a: 1, b: null, action: Action.Subtract },
    },
    {
      name: 'null action',
      input: { a: 1, b: 2, action: null },
    },
  ];

  test.each(invalidCases)(
    'returns null for invalid input: $name',
    ({ input }) => {
      expect(simpleCalculator(input)).toBeNull();
    }
  );
});
