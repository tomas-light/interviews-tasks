import {
  bitSort,
  buildValidBracketPairs,
  buildHeap,
  heapSort,
  mutateArrayToHeap,
  mutableHeapSort,
  mutableBitSort,
} from './buildValidBracketPairs';
import { pair_1, pair_2, pair_3, pair_4, pair_5 } from './validPairs';

describe('1 pair', () => {
  test('if length is correct', () => {
    const brackets = buildValidBracketPairs(1);
    expect(brackets.length).toBe(pair_1.length);
  });
  test('if pairs are valid', () => {
    const brackets = buildValidBracketPairs(1);
    expect(brackets).toEqual(pair_1);
  });
});

describe('2 pairs', () => {
  test('if length is correct', () => {
    const brackets = buildValidBracketPairs(2);
    expect(brackets.length).toBe(pair_2.length);
  });
  test('if pairs are valid', () => {
    const brackets = buildValidBracketPairs(2);
    expect(brackets).toEqual(pair_2);
  });
});
describe('3 pairs', () => {
  test('if length is correct', () => {
    const brackets = buildValidBracketPairs(3);
    expect(brackets.length).toBe(pair_3.length);
  });
  test('if pairs are valid', () => {
    const brackets = buildValidBracketPairs(3);
    expect(brackets).toEqual(pair_3);
  });
});
describe('4 pairs', () => {
  test('if length is correct', () => {
    const brackets = buildValidBracketPairs(4);
    expect(brackets.length).toBe(pair_4.length);
  });
  test('if pairs are valid', () => {
    const brackets = buildValidBracketPairs(4);
    expect(brackets).toEqual(pair_4);
  });
});
describe('5 pairs', () => {
  test('if length is correct', () => {
    const brackets = buildValidBracketPairs(5);
    expect(brackets.length).toBe(pair_5.length);
  });
  test('if pairs are valid', () => {
    const brackets = buildValidBracketPairs(5);
    expect(brackets).toEqual(pair_5);
  });
});

describe('buildHeap', () => {
  test('case 1 to max', () => {
    const heap = buildHeap([5, 7, 9, 4, 3, 8, 3, 1, 0, 3], (child, parent) => child > parent);
    expect(heap).toEqual([0, 9, 5, 8, 4, 3, 7, 3, 1, 0, 3]);
  });
  test('case 1 to min', () => {
    const heap = buildHeap([5, 7, 9, 4, 3, 8, 3, 1, 0, 3], (child, parent) => child < parent);
    expect(heap).toEqual([0, 0, 1, 3, 3, 3, 9, 8, 7, 4, 5]);
  });
});

describe('mutateArrayToHeap', () => {
  test('case 1 to min', () => {
    const heap = mutateArrayToHeap([5, 7, 9, 4, 3, 8, 3, 1, 0, 3], (child, parent) => child < parent);
    expect(heap).toEqual([0, 0, 3, 1, 3, 5, 3, 4, 9, 7, 8]);
  });
});

describe('heapSort', () => {
  test('case 1 to min', () => {
    const sortedArray = heapSort([5, 7, 9, 4, 3, 8, 3, 1, 0, 3], (child, parent) => child < parent);
    expect(sortedArray).toEqual([0, 1, 3, 3, 3, 4, 5, 7, 8, 9]);
  });
});

describe('mutableHeapSort', () => {
  test('case 1 to min', () => {
    const sortedArray = mutableHeapSort('75431508652130687'.split(''), (child, parent) => child < parent);
    expect(sortedArray).toEqual('00112334555667788'.split(''));
  });
});

describe('bitSort', () => {
  test('case 1 to min', () => {
    const sortedArray = bitSort(
      [
        //
        '(())(())',
        '()()()()',
        '((()()))',
      ],
      true
    );
    expect(sortedArray).toEqual([
      //
      '((()()))',
      '(())(())',
      '()()()()',
    ]);
  });

  test('case 1 to max', () => {
    const sortedArray = bitSort(
      [
        //
        '(())(())',
        '()()()()',
        '((()()))',
      ],
      false
    );
    expect(sortedArray).toEqual([
      //
      '()()()()',
      '(())(())',
      '((()()))',
    ]);
  });
});

describe('mutableBitSort', () => {
  test('case 1 to min', () => {
    const sortedArray = mutableBitSort([
      //
      '(())(())',
      '()()()()',
      '((()()))',
    ]);
    expect(sortedArray).toEqual([
      //
      '((()()))',
      '(())(())',
      '()()()()',
    ]);
  });
});
