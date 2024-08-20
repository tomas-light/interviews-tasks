describe('brackets, modification without recurse 1', () => {
  // test('if 1 pair are valid', () => {
  //   const brackets = generateBrackets1(1);
  //   expect(brackets).toEqual(['()']);
  // });
  //
  // test('if 2 pairs are valid', () => {
  //   const brackets = generateBrackets1(2);
  //   expect(brackets).toEqual(['(())', '()()']);
  // });
  //
  // test('if 3 pairs are valid', () => {
  //   const brackets = generateBrackets1(3);
  //   expect(brackets).toEqual([
  //     //
  //     '((()))',
  //     '(()())',
  //     '(())()',
  //     '()(())',
  //     '()()()',
  //   ]);
  // });
  //
  // test('if 4 pairs are valid', () => {
  //   const brackets = generateBrackets1(4);
  //   expect(brackets).toEqual([
  //     '(((())))',
  //     '((()()))',
  //     '((())())',
  //     '((()))()',
  //     '(()(()))',
  //     '(()()())',
  //     '(()())()',
  //     '(())(())',
  //     '(())()()',
  //     '()((()))',
  //     '()(()())',
  //     '()(())()',
  //     '()()(())',
  //     '()()()()',
  //   ]);
  // });

  test('if 5 pairs are valid', () => {
    const brackets = generateBrackets1(5);
    expect(brackets).toEqual([
      '((((()))))',
      '(((()())))',
      '(((())()))',
      '(((()))())',
      '(((())))()',
      '((()(())))',
      '((()()()))',
      '((()())())',
      '((()()))()',
      '((())(()))',
      '((())()())',
      '((())())()',
      '((()))(())',
      '((()))()()',
      '(()((())))',
      '(()(()()))',
      '(()(())())',
      '(()(()))()',
      '(()()(()))',
      '(()()()())',
      '(()()())()',
      '(()())(())',
      '(()())()()',
      '(())((()))',
      '(())(()())',
      '(())(())()',
      '(())()(())',
      '(())()()()',
      '()(((())))',
      '()((()()))',
      '()((())())',
      '()((()))()',
      '()(()(()))',
      '()(()()())',
      '()(()())()',
      '()(())(())',
      '()(())()()',
      '()()((()))',
      '()()(()())',
      '()()(())()',
      '()()()(())',
      '()()()()()',
    ]);
  });

  // test('if 6 pairs are valid', () => {
  //   const brackets = generateBrackets1(6);
  //   expect(brackets).toEqual(pair_6);
  // });
  //
  // test('if 7 pairs are valid', () => {
  //   const brackets = generateBrackets1(7);
  //   expect(brackets).toEqual(pair_7);
  // });
  //
  // test('if 8 pairs are valid', () => {
  //   const brackets = generateBrackets1(8);
  //   expect(brackets).toEqual(pair_8);
  // });

  function generateBrackets1(bracketPairsNumber: number) {
    const LEFT_BRACKET = '(';
    const RIGHT_BRACKET = ')';

    const targetLength = bracketPairsNumber * 2;

    const initialString = LEFT_BRACKET;
    let combinations = [
      {
        string: initialString,
        left: initialString.length,
        right: 0,
      },
    ];

    for (let brackets = initialString.length; brackets < targetLength; brackets++) {
      const nextCombinations = [] as typeof combinations;

      combinations.forEach(({ string, left, right }) => {
        if (left < bracketPairsNumber) {
          nextCombinations.push({
            right,
            left: left + 1,
            string: string + LEFT_BRACKET,
          });
        }

        if (right < left) {
          nextCombinations.push({
            right: right + 1,
            left,
            string: string + RIGHT_BRACKET,
          });
        }
      });

      combinations = nextCombinations;
    }

    return combinations.map((combo) => combo.string);
  }
});
