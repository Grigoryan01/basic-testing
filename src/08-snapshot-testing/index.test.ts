import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList([1, 2, 3]);

    // This will check that the generated linked list strictly matches this structure
    expect(result).toStrictEqual({
      value: 1,
      next: {
        value: 2,
        next: {
          value: 3,
          next: { value: null, next: null },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const result = generateLinkedList([10, 20, 30]);

    // This will create a snapshot of the linked list structure
    expect(result).toMatchSnapshot();
  });
});
