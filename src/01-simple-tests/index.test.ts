import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(
      simpleCalculator({ a: 2, b: 3, action: Action.Add }),
    ).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(
      simpleCalculator({ a: 10, b: 4, action: Action.Subtract }),
    ).toBe(6);
  });

  test('should multiply two numbers', () => {
    expect(
      simpleCalculator({ a: 3, b: 7, action: Action.Multiply }),
    ).toBe(21);
  });

  test('should divide two numbers', () => {
    expect(
      simpleCalculator({ a: 15, b: 3, action: Action.Divide }),
    ).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 2, b: 4, action: Action.Exponentiate }),
    ).toBe(16);
  });

  test('should return null for invalid action', () => {
    expect(
      simpleCalculator({ a: 2, b: 3, action: 'invalid' }),
    ).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'not-a-number', b: 3, action: Action.Add }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: 2, b: null, action: Action.Add }),
    ).toBeNull();

    expect(
      simpleCalculator({ a: 2, b: 3, action: null }),
    ).toBeNull();
  });
});
