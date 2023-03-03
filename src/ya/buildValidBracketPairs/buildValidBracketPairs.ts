/**
 * make valid sequences of brackets: ()()(()) ...
 *  */
export function buildValidBracketPairs(bracketPairsNumber: number) {
  const array: string[] = [];
  const targetLength = bracketPairsNumber * 2;

  generateString('', 0, 0);

  function generateString(currentString: string, left: number, right: number) {
    if (currentString.length === targetLength) {
      array.push(currentString);
      return;
    }

    if (right < left) {
      generateString(currentString + ')', left, right + 1);
    }

    if (bracketPairsNumber >= left + 1) {
      generateString(currentString + '(', left + 1, right);
    }
  }

  return array;
}
