// отличаются ли они лишь только порядком следования букв
export function areAnagrams(word1: string, word2: string): boolean {
  word1 = word1.trim();
  word2 = word2.trim();

  if (!word1 || !word2) {
    return false;
  }

  if (word1.length !== word2.length) {
    return false;
  }

  const letterMap1 = new Map<string, number>();
  const letterMap2 = new Map<string, number>();

  function countLetter(map: Map<string, number>, letter: string) {
    const count = map.get(letter) ?? 0;
    map.set(letter, count + 1);
  }

  for (let index = 0; index < word1.length; index++) {
    countLetter(letterMap1, word1[index]);
    countLetter(letterMap2, word2[index]);
  }

  for (const [letter, count1] of letterMap1.entries()) {
    const count2 = letterMap2.get(letter);
    if (count1 !== count2) {
      return false;
    }
  }

  return true;
}
