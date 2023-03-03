import { buildValidBracketPairs } from './buildValidBracketPairs';
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
