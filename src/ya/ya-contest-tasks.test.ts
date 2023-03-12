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
