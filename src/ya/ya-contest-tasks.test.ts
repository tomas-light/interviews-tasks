import { Coors, countJewelryInRocks, countOnesInBinaryVector, disinct, getShortestRoutes } from './ya-contest-tasks';

describe('countJewelryInRocks', () => {
  test('case 1', () => {
    const count = countJewelryInRocks(
      //
      'qwe',
      'qsddsasde'
    );
    expect(count).toBe(2);
  });

  test('case 2', () => {
    const count = countJewelryInRocks(
      //
      '',
      ''
    );
    expect(count).toBe(0);
  });

  test('case 3', () => {
    const count = countJewelryInRocks(
      //
      'qwe',
      'qsdwwdsaqsde'
    );
    expect(count).toBe(5);
  });
});

describe('countOnesInBinaryVector', () => {
  test('case 1', () => {
    const sequence = '510101';
    expect(countOnesInBinaryVector(sequence.length.toString(), ...sequence)).toBe(1);
  });
  test('case 2', () => {
    const sequence = '51101010';
    expect(countOnesInBinaryVector(sequence.length.toString(), ...sequence)).toBe(2);
  });
  test('case 3', () => {
    const sequence = '11111151101011';
    expect(countOnesInBinaryVector(sequence.length.toString(), ...sequence)).toBe(6);
  });
  test('case 3', () => {
    const sequence = '054603040';
    expect(countOnesInBinaryVector(sequence.length.toString(), ...sequence)).toBe(0);
  });
  test('case 4', () => {
    const sequence = '';
    expect(countOnesInBinaryVector(sequence.length.toString(), ...sequence)).toBe(0);
  });
  test('case 5', () => {
    const sequence = '1111';
    expect(countOnesInBinaryVector(sequence.length.toString(), ...sequence)).toBe(4);
  });
});

describe('disinct', () => {
  test('case 1', () => {
    const sequence = '10101';
    expect(disinct(sequence.length.toString(), ...sequence)).toEqual('10'.split(''));
  });
  test('case 2', () => {
    const sequence = '24888';
    expect(disinct(sequence.length.toString(), ...sequence)).toEqual('248'.split(''));
  });
  test('case 3', () => {
    const sequence = '22288';
    expect(disinct(sequence.length.toString(), ...sequence)).toEqual('28'.split(''));
  });
});

describe('getShortestRoutes', () => {
  test('case 1', () => {
    const coors: Coors[] = [
      ['0', '0'],
      ['0', '2'],
      ['2', '2'],
      ['0', '-2'],
      ['2', '-2'],
      ['2', '-1'],
      ['2', '1'],
    ];
    const maxLength = 2;

    const shortestRoute = getShortestRoutes(coors, maxLength, ['1', '3']);
    expect(shortestRoute).toBe(2);
  });

  test('case 2', () => {
    const coors: Coors[] = [
      ['0', '0'],
      ['1', '0'],
      ['0', '1'],
      ['1', '1'],
    ];
    const maxLength = 2;

    const shortestRoute = getShortestRoutes(coors, maxLength, ['1', '4']);
    expect(shortestRoute).toBe(1);
  });

  test('case 3', () => {
    const coors: Coors[] = [
      ['0', '0'],
      ['2', '0'],
      ['0', '2'],
      ['2', '2'],
    ];
    const maxLength = 1;

    const shortestRoute = getShortestRoutes(coors, maxLength, ['1', '4']);
    expect(shortestRoute).toBe(-1);
  });
});

test('tree observe', () => {
  type TreeNode = {
    value: number;
    children?: TreeNode[];
  };

  function dump(tree: { value: number; children?: TreeNode[] }): number[] {
    const values = [tree.value];

    if (!tree.children) {
      return values;
    }

    handleTreeChildren(tree.children);

    function handleTreeChildren(nodes: TreeNode[]) {
      if (!nodes.length) {
        return;
      }

      const nextNodes: TreeNode[] = [];

      nodes.forEach((node) => {
        values.push(node.value);

        if (!node.children) {
          return;
        }

        nextNodes.push(...node.children);
      });

      handleTreeChildren(nextNodes);
    }

    return values;
  }

  const result = dump({
    value: 1,
    children: [
      {
        value: 2,
        children: [
          {
            value: 4,
          },
          {
            value: 5,
          },
        ],
      },
      {
        value: 3,
        children: [
          {
            value: 6,
          },
        ],
      },
    ],
  });

  expect(result).toEqual([1, 2, 3, 4, 5, 6]);
});

/**
 * Дана строка, состоящая из нулей и единиц.
 * Надо найти наибольшую последовательность идущих подряд единиц.
 * Допускается наличие не более одного нуля в этом интервале.
 * @example
 * maxSequence('10101'); // 2 (потому что 101 - две единицы)
 * maxSequence('111010011'); // 4 (потому что 11101 - четыре единицы)
 * maxSequence('101101110'); // 5 (потому что 110111 - пять единиц)
 * */

/**
 * Даны два упорядоченных массива чисел. Надо вывести все числа первого массива,
 * которые отсутствуют во втором массиве.
 * @example
 * filter([1, 2, 3], [2, 3, 4]); // [1]
 * filter([3, 4, 7, 7, 8], [2, 3, 7, 9, 10]); // [4, 8]
 * filter([4, 5, 6, 7, 8, 9], [5, 7, 9]); // [4, 6, 8]
 * */

/**
 * Дан массив температур на каждый день. Надо найти для каждого дня количество
 * дней до следующего более тёплого дня. Если таких нет - вывести ноль
 * @example
 * warmDay([14, 13, 15, 11, 9, 12, 16]); // [2, 1, 4, 2, 1, 1, 0]
 * */
