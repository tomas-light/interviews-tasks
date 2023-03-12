import {
  bitSort,
  buildHeap,
  buildValidBracketPairs,
  buildValidBracketPairsWithoutRecurse,
  heapSort,
  mutableBitSort,
  mutableHeapSort,
  mutableHeapSort2,
  mutateArrayToHeap,
} from './buildValidBracketPairs';
import { pair_1, pair_10, pair_11, pair_2, pair_3, pair_4, pair_5, pair_6, pair_7, pair_8, pair_9 } from './validPairs';

describe('buildValidBracketPairs', () => {
  test('if 1 pair is valid', () => {
    const brackets = buildValidBracketPairs(1);
    expect(brackets).toEqual(pair_1);
  });

  test('if 2 pairs are valid', () => {
    const brackets = buildValidBracketPairs(2);
    expect(brackets).toEqual(pair_2);
  });

  test('if 3 pairs are valid', () => {
    const brackets = buildValidBracketPairs(3);
    expect(brackets).toEqual(pair_3);
  });

  test('if 4 pairs are valid', () => {
    const brackets = buildValidBracketPairs(4);
    expect(brackets).toEqual(pair_4);
  });

  test('if 5 pairs are valid', () => {
    const brackets = buildValidBracketPairs(5);
    expect(brackets).toEqual(pair_5);
  });

  test('if 6 pairs are valid', () => {
    const brackets = buildValidBracketPairs(6);
    expect(brackets).toEqual(pair_6);
  });

  test('if 7 pairs are valid', () => {
    const brackets = buildValidBracketPairs(7);
    expect(brackets).toEqual(pair_7);
  });

  test('if 8 pairs are valid', () => {
    const brackets = buildValidBracketPairs(8);
    expect(brackets).toEqual(pair_8);
  });

  test('if 9 pairs are valid', () => {
    const brackets = buildValidBracketPairs(9);
    expect(brackets).toEqual(pair_9);
  });

  test('if 10 pairs are valid', () => {
    const brackets = buildValidBracketPairs(10);
    expect(brackets).toEqual(pair_10);
  });

  test('if 11 pairs are valid', () => {
    const brackets = buildValidBracketPairs(11);
    expect(brackets).toEqual(pair_11);
  });
});

describe('buildValidBracketPairsWithoutRecurse', () => {
  test('if 1 pair are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(1);
    expect(brackets).toEqual(pair_1);
  });

  test('if 2 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(2);
    expect(brackets).toEqual(pair_2);
  });

  test('if 3 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(3);
    expect(brackets).toEqual(pair_3);
  });

  test('if 4 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(4);
    expect(brackets).toEqual(pair_4);
  });

  test('if 5 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(5);
    expect(brackets).toEqual(pair_5);
  });

  test('if 6 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(6);
    expect(brackets).toEqual(pair_6);
  });

  test('if 7 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(7);
    expect(brackets).toEqual(pair_7);
  });

  test('if 8 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(8);
    expect(brackets).toEqual(pair_8);
  });

  test('if 9 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(9);
    expect(brackets).toEqual(pair_9);
  });

  test('if 10 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(10);
    expect(brackets).toEqual(pair_10);
  });

  test('if 11 pairs are valid', () => {
    const brackets = buildValidBracketPairsWithoutRecurse(11);
    expect(brackets).toEqual(pair_11);
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

describe('mutableHeapSort2', () => {
  test('case 1 to min', () => {
    const sortedArray = mutableHeapSort2('75431508652130687'.split(''), (child, parent) => child < parent);
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
