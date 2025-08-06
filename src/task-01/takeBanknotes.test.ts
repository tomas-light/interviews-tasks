import { describe, test, expect } from 'vitest';
import { takeBanknotes, type BanknotesDictionary } from './takeBanknotes';

describe('[function] takeBanknotes', () => {
  test('8000 = 5000 + 2000 + 500x2', () => {
    expect(
      takeBanknotes({
        banknotes: {
          5000: 1,
          2000: 4,
          500: 20,
          200: 40,
        },
        amount: 3420,
      })
    ).toEqual({
      5000: 1,
      2000: 1,
      500: 2,
    });
  });

  const banknotes: BanknotesDictionary = {
    5000: 5,
    2000: 10,
    1000: 20,
    500: 40,
    200: 80,
    100: 160,
    50: 320,
    10: 640,
  };

  test('3440 = 2000 + 1000 + 200x2 + 10x4', () => {
    expect(
      takeBanknotes({
        banknotes: banknotes,
        amount: 3420,
      })
    ).toEqual({
      2000: 1,
      1000: 1,
      200: 2,
      10: 4,
    });
  });
});
