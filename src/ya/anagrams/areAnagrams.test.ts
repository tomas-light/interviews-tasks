import { areAnagrams } from './areAnagrams';

test('if returns true for "хлорид/дилорх"', () => {
  expect(areAnagrams('хлорид', 'дилорх')).toBe(true);
});
test('if returns true for "хлорид /дилорх"', () => {
  expect(areAnagrams('хлорид ', 'дилорх')).toBe(true);
});
test('if returns false for "хлоридд/дилорхо"', () => {
  expect(areAnagrams('хлоридд', 'дилорхо')).toBe(false);
});
test('if returns false for "хлорид/хлориид"', () => {
  expect(areAnagrams('хлорид', 'хлориид')).toBe(false);
});

test('if returns false for empty strings', () => {
  expect(areAnagrams('', '')).toBe(false);
});
