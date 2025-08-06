export type BanknotesDictionary = {
  [nominal: number]: number;
};

type Options = {
  /** available banknotes in the ATM */
  banknotes: BanknotesDictionary;

  /** how much money should be taken */
  amount: number;
};

export function takeBanknotes(options: Options): BanknotesDictionary {
  const { banknotes, amount } = options;

  const result: BanknotesDictionary = {};

  // todo:

  return result;
}
