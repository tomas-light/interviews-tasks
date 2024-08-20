// function generateBrackets(bracketPairsNumber: number) {
//   const LEFT_BRACKET = '(';
//   const RIGHT_BRACKET = ')';
//
//   let prevCombinations = [LEFT_BRACKET + RIGHT_BRACKET];
//
//   for (let brackets = 2; brackets <= bracketPairsNumber; brackets++) {
//     const combinations = [] as typeof prevCombinations;
//
//     for (const prevCombo of prevCombinations) {
//       combinations.push(LEFT_BRACKET + prevCombo + RIGHT_BRACKET);
//     }
//
//     for (let index = 0; index < prevCombinations.length - 1; index++) {
//       const prevCombo = prevCombinations[index];
//       combinations.push(prevCombo + LEFT_BRACKET + RIGHT_BRACKET);
//     }
//
//     for (let index = 0; index < prevCombinations.length; index++) {
//       const prevCombo = prevCombinations[index];
//       combinations.push(LEFT_BRACKET + RIGHT_BRACKET + prevCombo);
//     }
//
//     prevCombinations = combinations;
//   }
//
//   return prevCombinations;
// }

enum RBColor {
  Black = 0,
  Red = 1,
}

type RedBlackNode<Value extends string | number> = {
  color: RBColor;
  value: Value;
};

function isEven(value: number) {
  return value % 2 === 0;
}

function isOdd(value: number) {
  return value % 2 !== 0;
}

export function generateBrackets(bracketPairsNumber: number) {
  const LEFT_BRACKET = '(';
  const RIGHT_BRACKET = ')';

  let prevCombinations: (RedBlackNode<string> | null)[] = [
    null,
    {
      value: LEFT_BRACKET + RIGHT_BRACKET,
      color: RBColor.Black,
    },
  ];
  let prevPrevCombination: string | null = null;

  for (let brackets = 2; brackets <= bracketPairsNumber; brackets++) {
    const combinationsGraph = [null] as (RedBlackNode<string> | null)[];

    for (let index = 1; index < prevCombinations.length; index++) {
      const prevCombo = prevCombinations[index];
      if (!prevCombo) {
        continue;
      }

      const value1 = LEFT_BRACKET + prevCombo.value + RIGHT_BRACKET;
      addValueToRedBlackTree(combinationsGraph, value1);

      const value2 = prevCombo.value + LEFT_BRACKET + RIGHT_BRACKET;
      addValueToRedBlackTree(combinationsGraph, value2);

      const value3 = LEFT_BRACKET + RIGHT_BRACKET + prevCombo.value;
      if (value3 !== value2) {
        addValueToRedBlackTree(combinationsGraph, value3);
      }

      if (prevPrevCombination) {
        const value4 = String(prevPrevCombination + prevPrevCombination);
        if (value4.length === brackets * 2) {
          addValueToRedBlackTree(combinationsGraph, value4);
        }
      }
    }

    iterateBinaryTreeAscendance(
      prevCombinations,
      (prevCombo) => {
        prevPrevCombination = prevCombo?.value ?? null;
      },
      1
    );

    prevCombinations = combinationsGraph;
  }

  const brackets = [] as string[];
  iterateBinaryTreeAscendance(prevCombinations, (prevCombo) => {
    brackets.push(prevCombo.value);
  });

  return brackets;
}

function iterateBinaryTreeAscendance<T extends string | number>(
  redBlackTree: (RedBlackNode<T> | null)[],
  callback: (node: RedBlackNode<T>) => void,
  stopAfterIndex?: number
) {
  const iteratedIndexes = new Set<number>();
  let currentIndex = 1;

  while (iteratedIndexes.size < redBlackTree.length) {
    if (typeof stopAfterIndex === 'number' && iteratedIndexes.size === stopAfterIndex) {
      break;
    }

    const current = redBlackTree[currentIndex];
    if (current === null) {
      break;
    }

    if (iteratedIndexes.has(currentIndex)) {
      currentIndex = Math.trunc(currentIndex / 2);
      continue;
    }

    const leftChildIndex = currentIndex * 2;
    const leftChild = iteratedIndexes.has(leftChildIndex) ? undefined : redBlackTree[leftChildIndex];

    const rightChildIndex = currentIndex * 2 + 1;
    const rightChild = iteratedIndexes.has(rightChildIndex) ? undefined : redBlackTree[rightChildIndex];

    if (leftChild) {
      currentIndex = leftChildIndex;
    } else if (rightChild) {
      // only right child is not iterated
      callback(current);
      iteratedIndexes.add(currentIndex);
      currentIndex = rightChildIndex;
    } else {
      // no children or each child was iterated
      callback(current);
      iteratedIndexes.add(currentIndex);
      currentIndex = Math.trunc(currentIndex / 2);
    }
  }
}

/*
 * 1) if tree is empty, place new node to root with Black color
 * 2) if tree is not empty, place new node as in binary tree with Red color
 * 3) if parent of the new node is Black -> exit
 * 4) if parent of the new node is Red check the color of uncle of the new node:
 * 4.1) if uncle color is Black, or uncle is null -> rotate and recolor
 * 4.2) if uncle is Red -> recolor parent and uncle, then check grandparent
 *   4.2.1) if grandparent is root -> exit
 *   4.2.2) if grandparent is NOT root -> recolor grandparent and recheck
 * */
function addValueToRedBlackTree<T extends string | number>(redBlackTree: (RedBlackNode<T> | null)[], newValue: T) {
  if (redBlackTree.length === 1) {
    redBlackTree.push({
      color: RBColor.Black,
      value: newValue,
    });
    return;
  }

  const newNode: RedBlackNode<T> = {
    color: RBColor.Red,
    value: newValue,
  };

  const newNodeIndex = findNewValueIndex(redBlackTree, newValue);

  const isDuplicatedValue = newNodeIndex === -1;
  if (isDuplicatedValue) {
    return;
  }

  redBlackTree[newNodeIndex] = newNode;
  fixTreeViolations(newNodeIndex, newNode);

  function fixTreeViolations(currentIndex: number, currentNode: RedBlackNode<T>) {
    const parentIndex = Math.trunc(currentIndex / 2);
    const parent = redBlackTree[parentIndex];
    if (!parent) {
      return;
    }

    if (parent.color === RBColor.Black) {
      return;
    }

    const grandParentIndex = Math.trunc(parentIndex / 2);
    const grandParent = redBlackTree[grandParentIndex]!;

    let uncleIndex = grandParentIndex * 2;
    if (uncleIndex === parentIndex) {
      uncleIndex++;
    }
    const uncle = redBlackTree[uncleIndex];

    if (!uncle || uncle.color === RBColor.Black) {
      rotateAndRecolorNodes(redBlackTree, {
        current: {
          index: currentIndex,
          node: currentNode,
        },
        parent: {
          index: parentIndex,
          node: parent,
        },
        grandParent: {
          index: grandParentIndex,
          node: grandParent,
        },
      });
      return;
    }

    parent.color = Number(!parent.color);
    uncle.color = Number(!uncle.color);

    if (grandParentIndex === 1) {
      return;
    }

    grandParent.color = Number(!grandParent.color);
    fixTreeViolations(grandParentIndex, grandParent);
  }
}

function findNewValueIndex<T extends string | number>(redBlackTree: (RedBlackNode<T> | null)[], newValue: T) {
  let index = 1;

  while (true) {
    const currentNode = redBlackTree[index];
    if (!currentNode) {
      break;
    } else if (newValue < currentNode.value) {
      const leftChildIndex = index * 2;
      index = leftChildIndex;
    } else if (newValue > currentNode.value) {
      const rightChildIndex = index * 2 + 1;
      index = rightChildIndex;
    } else {
      return -1;
    }
  }

  return index;
}

function rotateAndRecolorNodes<
  T extends string | number,
  NodeInTree extends {
    index: number;
    node: RedBlackNode<T>;
  }
>(
  redBlackTree: (RedBlackNode<T> | null)[],
  nodes: {
    current: NodeInTree;
    parent: NodeInTree;
    grandParent: NodeInTree;
  }
) {
  const { current, parent, grandParent } = nodes;

  let _case: 'triangle' | 'line';

  if (
    (isEven(current.index) && isEven(parent.index) && isEven(grandParent.index)) ||
    (isOdd(current.index) && isOdd(parent.index) && isOdd(grandParent.index))
  ) {
    _case = 'line';
  } else {
    _case = 'triangle';
  }

  if (_case === 'triangle') {
    rotateNodesAsTriangle(redBlackTree, { current, parent });
    rotateNodesAsLine(redBlackTree, {
      current: parent,
      parent: current,
      grandParent,
    });

    [grandParent.node.color, current.node.color] = [current.node.color, grandParent.node.color];
  } else {
    rotateNodesAsLine(redBlackTree, {
      current,
      parent,
      grandParent,
    });

    [grandParent.node.color, parent.node.color] = [parent.node.color, grandParent.node.color];
  }
}
function rotateNodesAsTriangle<
  T extends string | number,
  NodeInTree extends {
    index: number;
    node: RedBlackNode<T>;
  }
>(
  redBlackTree: (RedBlackNode<T> | null)[],
  nodes: {
    current: NodeInTree;
    parent: NodeInTree;
  }
) {
  const { current, parent } = nodes;

  let newParentIndex: number;

  if (isEven(current.index)) {
    // rotate to right
    newParentIndex = current.index + 1;
  } else {
    // rotate to left
    newParentIndex = current.index - 1;
  }

  redBlackTree[newParentIndex] = parent.node;
  redBlackTree[parent.index] = current.node;

  delete redBlackTree[current.index];

  parent.index = newParentIndex;
  current.index = parent.index;
}
function rotateNodesAsLine<
  T extends string | number,
  NodeInTree extends {
    index: number;
    node: RedBlackNode<T>;
  }
>(
  redBlackTree: (RedBlackNode<T> | null)[],
  nodes: {
    current: NodeInTree;
    parent: NodeInTree;
    grandParent: NodeInTree;
  }
) {
  const { current, parent, grandParent } = nodes;

  let newGrandParentIndex: number;

  if (isEven(current.index)) {
    // rotate to right
    newGrandParentIndex = parent.index + 1;
  } else {
    // rotate to left
    newGrandParentIndex = parent.index - 1;
  }

  redBlackTree[newGrandParentIndex] = grandParent.node;
  redBlackTree[grandParent.index] = parent.node;
  redBlackTree[parent.index] = current.node;

  delete redBlackTree[current.index];

  grandParent.index = newGrandParentIndex;
  parent.index = grandParent.index;
  current.index = parent.index;
}
