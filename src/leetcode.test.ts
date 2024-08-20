import { node } from 'webpack';
import { RedBlackTreeNode } from './trees/RedBlackTreeNode';

describe('longest string', () => {
  function lengthOfLongestSubstring(s: string): number {
    const set = new Set();
    let longestLength = 0;
    let currentLength = 0;
    let removingCharIndex = 0;

    for (const char of s) {
      if (set.has(char)) {
        if (currentLength > longestLength) {
          longestLength = currentLength;
        }

        while (set.has(char)) {
          set.delete(s[removingCharIndex++]);
        }
        currentLength = set.size;
      }
      set.add(char);
      currentLength++;
    }

    if (currentLength > longestLength) {
      longestLength = currentLength;
    }

    return longestLength;
  }

  test('', () => {
    expect(lengthOfLongestSubstring('pwwkew')).toBe(3);
  });
});

describe('median', () => {
  function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
    if (!nums1.length && !nums2.length) {
      return 0;
    }

    const array = [];

    let index = 0;
    let jindex = 0;

    while (index < nums1.length || jindex < nums2.length) {
      const left = nums1[index];
      const right = nums2[jindex];

      if (right === undefined || left <= right) {
        array.push(left);
        index++;
      } else {
        array.push(right);
        jindex++;
      }
    }

    if (array.length === 1) {
      return array[0];
    }

    if (array.length % 2 === 0) {
      const medianIndex1 = array.length / 2;
      const medianIndex2 = medianIndex1 + 1;
      const sum = array[medianIndex1 - 1] + array[medianIndex2 - 1];
      return sum / 2;
    }

    const medianIndex1 = Math.ceil(array.length / 2);
    return array[medianIndex1 - 1];
  }

  test('', () => {
    expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
  });
});

describe('frog and obstacles', () => {
  function generateObstacles(laneLength: number, lanes = 3) {
    const obstacles = [0]; // first point is free from obstacles

    for (let index = 1; index <= laneLength; index++) {
      const random = (Math.random() * 100 * lanes) / 100;
      const rounded = Math.round(random);
      obstacles[index] = rounded;
    }

    return obstacles;
  }

  let row = 1;
  test.skip.each(new Array(10).fill(10))(`${row++}`, (laneLength) => {
    expect(generateObstacles(laneLength)).toEqual([]);
  });

  const obstaclesSet = [
    [0, 1, 0, 3, 3, 1, 2, 1, 1, 2, 1], // 1 side jump: to lane 3 at point 5
    [0, 0, 2, 1, 1, 2, 0, 1, 1, 0, 3],
    // 2 side jumps:
    // at 1 to lane 3,
    // at 9 to lane 2

    [0, 2, 1, 2, 0, 2, 1, 1, 0, 1, 0], // 1 side jump to lane 3 at point 0
    [0, 2, 1, 3, 2, 3, 0, 3, 1, 1, 1],
    // 4 side jumps:
    // at 0 to lane 3,
    // at 2 to lane 2,
    // at 3 to lane 1,
    // at 7 to lane 2

    [0, 2, 1, 3, 2, 2, 0, 2, 2, 3, 0],
    // 3 side jumps:
    // at 0 to lane 3,
    // at 2 to lane 2,
    // at 3 to lane 1

    [0, 1, 2, 1, 3, 1, 1, 2, 3, 0, 1],
    // 5 side jumps:
    // at 1 to lane 3,
    // at 3 to lane 2,
    // at 6 to lane 3,
    // at 7 to lane 1
    // at 9 to lane 2

    [0, 3, 0, 3, 1, 2, 3, 0, 3, 2, 1],
    // 3 side jumps:
    // at 4 to lane 3,
    // at 5 to lane 1,
    // at 9 to lane 2

    [0, 0, 0, 0, 2, 1, 1, 1, 1, 1, 2], // 1 side jump: to lane 3 at point 3
    [0, 1, 1, 1, 3, 2, 2, 2, 0, 0, 2], // 1 side jump: at 4 to lane 1
    [0, 2, 2, 3, 1, 1, 0, 1, 0, 2, 2],
    // 3 side jumps:
    // at 0 to lane 1,
    // at 3 to lane 2
    // at 8 to lane 3
  ];

  const answers: [number[], number][] = [
    [obstaclesSet[0], 1],
    [obstaclesSet[1], 2],
    [obstaclesSet[2], 1],
    [obstaclesSet[3], 4],
    [obstaclesSet[4], 3],
    [obstaclesSet[5], 5],
    [obstaclesSet[6], 3],
    [obstaclesSet[7], 1],
    [obstaclesSet[8], 1],
    [obstaclesSet[9], 3],
  ];

  function minSideJumps(obstacles: number[]) {
    const lanes = [1, 2, 3];
    let sideJumps = 0;

    for (let currentPoint = 0, currentLane = 2; currentPoint < obstacles.length; ) {
      while (currentPoint + 1 < obstacles.length && obstacles[currentPoint + 1] !== currentLane) {
        currentPoint++;
      }
      // ideal scenario, when we don't need to jump anywhere
      if (currentPoint >= obstacles.length - 1) {
        break;
      }

      const otherLanes = lanes.filter((lane) => lane !== currentLane);
      const availableLanes = [] as number[];
      otherLanes.forEach((lane) => {
        if (obstacles[currentPoint] !== lane) {
          availableLanes.push(lane);
        }
      });

      if (availableLanes.length === 1) {
        currentLane = availableLanes[0];
        sideJumps++;
        continue;
      }

      const maxLaneUnbreakablePath = new Map<number, number>();
      availableLanes.forEach((lane) => {
        let unbreakableLength = 1;
        let lanePoint = currentPoint + 1;
        while (lanePoint < obstacles.length && obstacles[lanePoint] !== lane) {
          lanePoint++;
          unbreakableLength++;
        }
        maxLaneUnbreakablePath.set(lane, unbreakableLength);
      });

      let longestUnbreakableLane = 0;
      let maxLength = 0;
      for (const [lane, length] of maxLaneUnbreakablePath) {
        if (length > maxLength) {
          maxLength = length;
          longestUnbreakableLane = lane;
        }
      }

      currentLane = longestUnbreakableLane;
      sideJumps++;
      currentPoint += longestUnbreakableLane - 1;
    }

    return sideJumps;
  }

  test.each(answers)('check case %s', (obstacles, expectedResult) => {
    expect(minSideJumps(obstacles)).toBe(expectedResult);
  });
  test.skip('obstackes 4', () => {
    expect(minSideJumps(answers[3][0])).toBe(answers[3][1]);
  });
});

describe('124. Binary Tree Maximum Path Sum', () => {
  class TreeNode {
    val: number;
    left: TreeNode | null;
    right: TreeNode | null;
    constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
      this.val = val === undefined ? 0 : val;
      this.left = left === undefined ? null : left;
      this.right = right === undefined ? null : right;
    }
  }

  test('tree 1', () => {
    const rootNode = new TreeNode(1, new TreeNode(2), new TreeNode(3));
    expect(maxPathSum(rootNode)).toBe(6);
  });

  test('tree 2', () => {
    const rootNode = new TreeNode(-10, new TreeNode(9), new TreeNode(20, new TreeNode(15), new TreeNode(7)));
    expect(maxPathSum(rootNode)).toBe(42);
  });

  test('tree 3', () => {
    /**
     * [
     *                    1,
     *            0,                    1,
     *     1,         2,        0,         -1,
     *   0,   1,   -1,   0,   -1,  0,     1,   0
     * ]
     * */
    const rootNode = new TreeNode(
      1,
      new TreeNode(
        0,
        new TreeNode(1, new TreeNode(0), new TreeNode(1)),
        new TreeNode(2, new TreeNode(-1), new TreeNode(0))
      ),
      new TreeNode(
        1,
        new TreeNode(0, new TreeNode(-1), new TreeNode(0)),
        new TreeNode(-1, new TreeNode(1), new TreeNode(0))
      )
    );
    expect(maxPathSum(rootNode)).toBe(4);
  });

  test('tree 4', () => {
    /**
     * [
     *                              5,
     *                4,                          8,
     *        11,                          13,          4,
     *     7,     2,                                       1
     * ]
     * */
    const rootNode = new TreeNode(
      5,
      new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2)), null),
      new TreeNode(8, new TreeNode(13), new TreeNode(4, null, new TreeNode(1)))
    );
    expect(maxPathSum(rootNode)).toBe(48);
  });

  test('tree 5', () => {
    const rootNode = new TreeNode(
      9,
      new TreeNode(6),
      new TreeNode(
        -3,
        new TreeNode(-6),
        new TreeNode(2, new TreeNode(2, new TreeNode(-6, new TreeNode(-6)), new TreeNode(-6)))
      )
    );
    expect(maxPathSum(rootNode)).toBe(16);
  });

  function maxPathSum(root: TreeNode | null): number {
    let maximum: number = -Infinity;

    findMaxForNode(root);
    function findMaxForNode(node: TreeNode | null): number {
      if (!node) {
        return 0;
      }

      const leftBranchSum = findMaxForNode(node.left);
      const rightBranchSum = findMaxForNode(node.right);

      const nodeAndBranchesSum = leftBranchSum + rightBranchSum + node.val;
      if (nodeAndBranchesSum > maximum) {
        maximum = nodeAndBranchesSum;
      }

      const leftSum = leftBranchSum + node.val;
      const rightSum = rightBranchSum + node.val;

      const maxBranch = Math.max(leftSum, rightSum, node.val);
      if (maxBranch > maximum) {
        maximum = maxBranch;
      }

      return maxBranch;
    }

    return maximum;
  }
});

describe('merge sorted lists', () => {
  class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
      this.val = val === undefined ? 0 : val;
      this.next = next === undefined ? null : next;
    }
  }

  // red black tree
  function mergeKLists1(lists: Array<ListNode | null>): ListNode | null {
    let rootNode: RedBlackTreeNode | null = null;

    for (let node of lists) {
      while (node) {
        if (!rootNode) {
          rootNode = new RedBlackTreeNode(node.val, 'black');
        } else {
          rootNode = rootNode.addValueToTree(node.val);
        }
        node = node.next;
      }
    }

    const sortedLinkedList = new ListNode();
    let lastNode = sortedLinkedList;

    const visitedNodes = new WeakSet<RedBlackTreeNode>();
    let currentRedBlackNode = rootNode as RedBlackTreeNode | null;

    while (true) {
      if (!currentRedBlackNode) {
        break;
      }

      if (currentRedBlackNode.leftChild && !visitedNodes.has(currentRedBlackNode.leftChild)) {
        currentRedBlackNode = currentRedBlackNode.leftChild;
        continue;
      }

      if (!visitedNodes.has(currentRedBlackNode)) {
        lastNode = lastNode.next = new ListNode(currentRedBlackNode.value);
        visitedNodes.add(currentRedBlackNode);
      }

      if (currentRedBlackNode.rightChild && !visitedNodes.has(currentRedBlackNode.rightChild)) {
        currentRedBlackNode = currentRedBlackNode.rightChild;
        continue;
      }

      currentRedBlackNode = currentRedBlackNode.parent;
    }

    return sortedLinkedList.next;
  }

  function prepareList(array: number[][]) {
    return array.reduce((lists, current) => {
      lists.push(arrayToList(current));
      return lists;
    }, [] as (ListNode | null)[]);
  }

  function arrayToList(array: number[]) {
    const node = new ListNode();

    array.reduce((list, current) => {
      return (list.next = new ListNode(current));
    }, node);

    return node.next;
  }

  // heap
  function mergeKLists2(lists: Array<ListNode | null>): ListNode | null {
    const heap: (ListNode | null)[] = [null];

    for (let node of lists) {
      while (node) {
        if (!node) {
          break;
        }

        heap.push(node);

        let index = heap.length - 1;
        while (index > 0) {
          const parentIndex = Math.floor(index / 2);
          const parent = heap[parentIndex];
          if (parent == null) {
            break;
          }

          if (node.val < parent.val) {
            [heap[parentIndex], heap[index]] = [heap[index], heap[parentIndex]];
            index = parentIndex;
          } else {
            break;
          }
        }

        node = node.next;
      }
    }

    const sortedLinkedList = new ListNode();
    let lastNode = sortedLinkedList;

    while (true) {
      const lowestNode = heap[1];
      if (lowestNode == null) {
        break;
      }

      lastNode = lastNode.next = lowestNode; // mutation of original node !!!

      if (heap.length <= 2) {
        break;
      }

      const current = (heap[1] = heap.pop()!);

      let index = 1;
      while (true) {
        const leftChildIndex = index * 2;
        const leftChild = heap[leftChildIndex];

        const rightChildIndex = leftChildIndex + 1;
        const rightChild = heap[rightChildIndex];

        if (leftChild && rightChild) {
          if (leftChild.val <= rightChild.val && leftChild.val < current.val) {
            [heap[leftChildIndex], heap[index]] = [heap[index], heap[leftChildIndex]];
            index = leftChildIndex;
          } else if (rightChild.val < leftChild.val && rightChild.val < current.val) {
            [heap[rightChildIndex], heap[index]] = [heap[index], heap[rightChildIndex]];
            index = rightChildIndex;
          } else {
            break;
          }
        } else if (leftChild && leftChild.val < current.val) {
          [heap[leftChildIndex], heap[index]] = [heap[index], heap[leftChildIndex]];
          index = leftChildIndex;
        } else if (rightChild && rightChild.val < current.val) {
          [heap[rightChildIndex], heap[index]] = [heap[index], heap[rightChildIndex]];
          index = rightChildIndex;
        } else {
          break;
        }
      }
    }
    lastNode.next = null;

    return sortedLinkedList.next;
  }

  // merge sort
  function mergeKLists(lists: Array<ListNode | null>): ListNode | null {
    const nodes: ListNode[] = [];

    for (let index = 0; index < lists.length; index++) {
      const node = lists[index];
      if (node) {
        nodes.push(node);
      }
    }

    const sortedLinkedList = new ListNode();
    let lastNode = sortedLinkedList;

    while (true) {
      let [minNode] = nodes;
      if (!minNode) {
        break;
      }

      let minIndex = 0;
      for (let index = 1; index < nodes.length; index++) {
        const node = nodes[index];
        if (node.val < minNode.val) {
          minNode = node;
          minIndex = index;
        }
      }

      lastNode = lastNode.next = minNode;
      while (minNode.next) {
        minNode = minNode.next;

        if (minNode.val === lastNode.val) {
          lastNode = lastNode.next = minNode;
        } else {
          break;
        }
      }

      if (minNode !== lastNode) {
        nodes[minIndex] = minNode;
      } else {
        nodes.splice(minIndex, 1);
      }
    }

    return sortedLinkedList.next;
  }

  test('case 1', () => {
    const lists = prepareList([
      [1, 4, 5],
      [1, 3, 4],
      [2, 6],
    ]);

    const mergedList = mergeKLists(lists);
    let node = mergedList;
    const values: number[] = [];
    while (node) {
      values.push(node.val);
      node = node.next;
    }

    expect(values).toEqual([1, 1, 2, 3, 4, 4, 5, 6]);
  });

  test('case 2', () => {
    const lists = prepareList([
      [1, 3, 4, 6, 8, 9, 12],
      [1, 2, 5, 7, 11, 21, 24],
      [-4, 0, 4, 7, 10, 14, 22, 29],
    ]);

    const mergedList = mergeKLists(lists);
    let node = mergedList;
    const values: number[] = [];
    while (node) {
      values.push(node.val);
      node = node.next;
    }

    expect(values).toEqual([-4, 0, 1, 1, 2, 3, 4, 4, 5, 6, 7, 7, 8, 9, 10, 11, 12, 14, 21, 22, 24, 29]);
  });

  test('case 3', () => {
    const lists = prepareList([[], [-1, 5], [1, 4, 6], [4, 5, 6]]);

    const mergedList = mergeKLists(lists);
    let node = mergedList;
    const values: number[] = [];
    while (node) {
      values.push(node.val);
      node = node.next;
    }

    expect(values).toEqual([-1, 1, 4, 4, 5, 5, 6, 6]);
  });

  test('case 84', () => {
    const lists = prepareList([
      [-10, -9, -9, -9, -7, -2, -1, 2, 4],
      [-9, -7, -6, -6, -3, 0, 1, 3],
      [-10, -9, -2, -1, 1, 3],
    ]);

    const mergedList = mergeKLists(lists);
    let node = mergedList;
    const values: number[] = [];
    while (node) {
      values.push(node.val);
      node = node.next;
    }

    expect(values).toEqual([-10, -10, -9, -9, -9, -9, -9, -7, -7, -6, -6, -3, -2, -2, -1, -1, 0, 1, 1, 2, 3, 3, 4]);
  });
});
