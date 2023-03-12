// function from JS example provided by Yandex
// function readConsoleAndRunCallback(callback) {
//   const readline = require('readline');
//
//   const rl = readline.createInterface({
//     input: process.stdin,
//   });
//
//   const lines = [];
//
//   rl.on('line', (line) => {
//     lines.push(line);
//   }).on('close', () => {
//     const result = callback(...lines);
//
//     if (result && Array.isArray(result)) {
//       result.forEach((line) => {
//         process.stdout.write(`${line.toString()}\n`);
//       });
//     } else {
//       process.stdout.write(result.toString());
//     }
//   });
// }

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
});

let bracketPairsNumber = 0;

rl.on('line', (line) => {
  bracketPairsNumber = parseInt(line, 10);
}).on('close', () => {
  const leftBracket = '(';
  const rightBracket = ')';

  const targetLength = bracketPairsNumber * 2;

  const initialString = leftBracket;
  let combinations = [
    {
      string: initialString,
      left: initialString.length,
      right: 0,
    },
  ];

  for (let brackets = initialString.length; brackets < targetLength; brackets++) {
    const nextCombinations = [];

    combinations.forEach(({ string, left, right }) => {
      if (left < bracketPairsNumber) {
        nextCombinations.push({
          right,
          left: left + 1,
          string: string + leftBracket,
        });
      }

      if (right < left) {
        nextCombinations.push({
          right: right + 1,
          left,
          string: string + rightBracket,
        });
      }
    });

    combinations = nextCombinations;
  }

  combinations.forEach((combo) => {
    process.stdout.write(`${combo.string}\n`);
  });
});

function mutableBitSort(array, attempt = 0, maxLength = array[0].length /* all items have same length */) {
  if (attempt >= maxLength) {
    return array;
  }

  let startIndex = 0;
  const { length } = array;

  for (let index = 0; index < length - 1; index++) {
    const item = array[startIndex];
    const bracket = item[item.length - attempt - 1];

    if (bracket === ')') {
      delete array[startIndex];
      array.push(item);
    }
    startIndex++;
  }

  mutableFilter(array);

  return mutableBitSort(array, attempt + 1);
}

function mutableFilter(array) {
  let availableIndex = 0;
  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    if (item !== undefined) {
      delete array[index];
      array[availableIndex] = item;
      availableIndex++;
    }
  }

  array.length = availableIndex;

  return array;
}
