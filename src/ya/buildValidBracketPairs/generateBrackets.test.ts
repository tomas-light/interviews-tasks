import { generateBrackets } from './generateBrackets';
// import {
//   pair_1,
//   pair_2,
//   pair_3,
//   pair_4,
//   pair_5,
//   pair_6,
//   pair_7,
//   pair_8,
// } from './validPairs';

describe('generateBrackets', () => {
  // test('pair-1', () => {
  //   const brackets = generateBrackets(1);
  //   expect(brackets).toEqual(pair_1);
  // });
  //
  // test('pair-2', () => {
  //   const brackets = generateBrackets(2);
  //   expect(brackets).toEqual(pair_2);
  // });
  //
  // test('if 3 pairs are valid', () => {
  //   const brackets = generateBrackets(3);
  //   expect(brackets).toEqual(pair_3);
  // });

  test('if 4 pairs are valid', () => {
    const brackets = generateBrackets(4);
    // expect(brackets).toEqual(pair_4);
    expect(brackets).toEqual([]);
  });

  // test('if 5 pairs are valid', () => {
  //   const brackets = generateBrackets(5);
  //   expect(brackets).toEqual(pair_5);
  // });
  //
  // test('if 6 pairs are valid', () => {
  //   const brackets = generateBrackets(6);
  //   expect(brackets).toEqual(pair_6);
  // });
  //
  // test('if 7 pairs are valid', () => {
  //   const brackets = generateBrackets(7);
  //   expect(brackets).toEqual(pair_7);
  // });
  //
  // test('if 8 pairs are valid', () => {
  //   const brackets = generateBrackets(8);
  //   expect(brackets).toEqual(pair_8);
  // });
});
