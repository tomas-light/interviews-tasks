/**
 * make valid sequences of brackets: ()()(()) ...
 *  */
export function buildValidBracketPairs(bracketPairsNumber: number) {
  const array: string[] = [];
  const targetLength = bracketPairsNumber * 2;

  const leftBracket = '(';
  const rightBracket = ')';

  generateString('', 0, 0);
  function generateString(currentString: string, left: number, right: number) {
    if (currentString.length === targetLength) {
      array.push(currentString);
      return;
    }

    if (bracketPairsNumber > left) {
      generateString(currentString + leftBracket, left + 1, right);
    }

    if (right < left) {
      generateString(currentString + rightBracket, left, right + 1);
    }
  }

  return array;
}

export function buildValidBracketPairsWithoutRecurse(bracketPairsNumber: number) {
  const LEFT_BRACKET = '(';
  const RIGHT_BRACKET = ')';

  const targetLength = bracketPairsNumber * 2;

  const initialString = LEFT_BRACKET;
  let combinations = [
    {
      string: initialString,
      left: initialString.length,
      right: 0,
    },
  ];

  for (let brackets = initialString.length; brackets < targetLength; brackets++) {
    const nextCombinations = [] as typeof combinations;

    combinations.forEach(({ string, left, right }) => {
      if (left < bracketPairsNumber) {
        nextCombinations.push({
          right,
          left: left + 1,
          string: string + LEFT_BRACKET,
        });
      }

      if (right < left) {
        nextCombinations.push({
          right: right + 1,
          left,
          string: string + RIGHT_BRACKET,
        });
      }
    });

    combinations = nextCombinations;
  }

  return combinations.map((combo) => combo.string);
}

export function bitSort(
  array: string[],
  ascending: boolean,
  attempt = 0,
  maxLength = array[0].length /* all items have same length */
): typeof array {
  if (attempt >= maxLength) {
    return array;
  }

  // create pocket for each possible value
  const leftBracketsPocket: string[] = [];
  const rightBracketsPocket: string[] = [];

  array.forEach((item) => {
    let bracket: string;
    if (ascending) {
      bracket = item[item.length - attempt - 1];
    } else {
      bracket = item[attempt];
    }
    if (bracket === '(') {
      leftBracketsPocket.push(item);
    } else {
      rightBracketsPocket.push(item);
    }
  });

  array = leftBracketsPocket.concat(rightBracketsPocket);

  return bitSort(array, ascending, attempt + 1);
}

export function mutableBitSort(
  array: string[],
  attempt = 0,
  maxLength = array[0].length /* all items have same length */
): typeof array {
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

/** It filters undefined values in array */
function mutableFilter<T>(array: T[]) {
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

export function buildHeap<T>(array: T[], compare: (child: T, parent: T) => boolean): T[] {
  const heap = [0] as any[];

  for (let index = 0; index < array.length; index++) {
    const item = array[index];
    heap.push(item);

    swapWithParentIfNeeded(item, index + 1);
  }

  function swapWithParentIfNeeded(item: T, itemIndex: number) {
    const parentIndex = Math.floor(itemIndex / 2);
    if (parentIndex === 0) {
      return; // don't chat root node
    }

    const parent = heap[parentIndex];
    if (compare(item, parent)) {
      [heap[itemIndex], heap[parentIndex]] = [heap[parentIndex], heap[itemIndex]];
      swapWithParentIfNeeded(item, parentIndex);
    }
  }

  return heap;
}
export function heapSort<T>(array: T[], compare: (child: T, parent: T) => boolean): T[] {
  const heap = buildHeap(array, compare);
  const newArray = [] as T[];

  function swapWithChildIfNeeded(item: T, itemIndex: number) {
    const leftChildIndex = itemIndex * 2;
    const rightChildIndex = itemIndex * 2 + 1;

    const leftChild = heap[leftChildIndex];
    const rightChild = heap[rightChildIndex];

    const hasNoLeftChildInHeap = typeof leftChild === 'undefined';
    if (hasNoLeftChildInHeap) {
      return;
    }

    if (typeof rightChild === 'undefined') {
      if (compare(leftChild, item)) {
        [heap[leftChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[leftChildIndex]];
        swapWithChildIfNeeded(item, leftChildIndex);
      }
      return;
    }

    let areLeftAndRightChildrenEquals: boolean;

    if (compare(leftChild, rightChild)) {
      if (compare(leftChild, item)) {
        [heap[leftChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[leftChildIndex]];
        swapWithChildIfNeeded(item, leftChildIndex);
      }
      return;
    } else if ((areLeftAndRightChildrenEquals = !compare(rightChild, leftChild))) {
      if (compare(leftChild, item)) {
        [heap[leftChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[leftChildIndex]];
        swapWithChildIfNeeded(item, leftChildIndex);
      }
      return;
    }

    if (compare(rightChild, leftChild)) {
      if (compare(rightChild, item)) {
        [heap[rightChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[rightChildIndex]];
        swapWithChildIfNeeded(item, rightChildIndex);
      }
    }
  }

  while (heap.length > 1) {
    // the lest item in heap (if compare is left < right),
    // or the greatest item in heap (if compare is left > right)
    const heapRoot = heap[1]; // because zero index has 0
    newArray.push(heapRoot);

    const lastElement = heap.pop()!;
    if (heap.length > 1) {
      heap[1] = lastElement;
      swapWithChildIfNeeded(lastElement, 1);
    }
  }

  return newArray;
}

export function mutateArrayToHeap<T>(array: T[], compare: (child: T, parent: T) => boolean): T[] {
  array.unshift(0 as any);

  const lastIndex = array.length - 1;

  for (let index = lastIndex; index >= 0; index--) {
    const item = array.pop()!;
    const insertIndex = lastIndex - index + 1;
    array.splice(insertIndex, 0, item);
    swapWithParentIfNeeded(item, insertIndex);
  }

  function swapWithParentIfNeeded(item: T, itemIndex: number) {
    const parentIndex = Math.floor(itemIndex / 2);
    if (parentIndex === 0) {
      return; // don't change root node
    }

    const parent = array[parentIndex];
    if (compare(item, parent)) {
      [array[itemIndex], array[parentIndex]] = [array[parentIndex], array[itemIndex]];
      swapWithParentIfNeeded(item, parentIndex);
    }
  }

  return array;
}

export function mutableHeapSort<T>(array: T[], compare: (child: T, parent: T) => boolean): T[] {
  const { length } = array;

  const heap = mutateArrayToHeap(array, compare);
  const newArray = heap;

  let index = array.length - 1;

  function swapWithChildIfNeeded(item: T, itemIndex: number) {
    const leftChildIndex = itemIndex * 2;
    const rightChildIndex = itemIndex * 2 + 1;

    const leftChild = heap[leftChildIndex];
    const rightChild = heap[rightChildIndex];

    const hasNoLeftChildInHeap = leftChildIndex > index;
    if (hasNoLeftChildInHeap) {
      return;
    }

    if (rightChildIndex > index) {
      if (compare(leftChild, item)) {
        [heap[leftChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[leftChildIndex]];
        swapWithChildIfNeeded(item, leftChildIndex);
      }
      return;
    }

    let areLeftAndRightChildrenEquals: boolean;

    if (compare(leftChild, rightChild)) {
      if (compare(leftChild, item)) {
        [heap[leftChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[leftChildIndex]];
        swapWithChildIfNeeded(item, leftChildIndex);
      }
      return;
    } else if ((areLeftAndRightChildrenEquals = !compare(rightChild, leftChild))) {
      if (compare(leftChild, item)) {
        [heap[leftChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[leftChildIndex]];
        swapWithChildIfNeeded(item, leftChildIndex);
      }
      return;
    }

    if (compare(rightChild, leftChild)) {
      if (compare(rightChild, item)) {
        [heap[rightChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[rightChildIndex]];
        swapWithChildIfNeeded(item, rightChildIndex);
      }
    }
  }

  while (index > 0) {
    // the lest item in heap (if compare is left < right),
    // or the greatest item in heap (if compare is left > right)
    // is placed right after reserved zero

    // swap reserved zero with next value in sorted array

    const [sortedItem] = newArray.splice(1, 1);
    newArray.splice(length, 0, sortedItem);

    index--;

    if (index > 0) {
      const [lastElement] = heap.splice(index, 1);
      heap.splice(1, 0, lastElement);
      swapWithChildIfNeeded(lastElement, 1);
    }
  }

  newArray.shift();

  return newArray;
}

export function mutableHeapSort2<T>(array: T[], compare: (child: T, parent: T) => boolean): T[] {
  const { length } = array;

  if (length === 1) {
    return array;
  }

  const heap = mutateArrayToHeap(array, compare);
  const newArray = heap;

  let index = array.length - 1;

  while (index > 0) {
    // the lest item in heap (if compare is left < right),
    // or the greatest item in heap (if compare is left > right)
    // is placed right after reserved zero

    // swap reserved zero with next value in sorted array

    const sortedItem = newArray[1];
    newArray.push(sortedItem);

    const lastItemIndex = index;
    index--;

    if (index > 0) {
      const lastElement = heap[lastItemIndex];
      delete heap[lastItemIndex];
      heap[1] = lastElement;
      swapWithChildIfNeeded(lastElement, 1);
    }
  }

  function swapWithChildIfNeeded(item: T, itemIndex: number) {
    const leftChildIndex = itemIndex * 2;
    const rightChildIndex = itemIndex * 2 + 1;

    const leftChild = heap[leftChildIndex];
    const rightChild = heap[rightChildIndex];

    const hasNoLeftChildInHeap = leftChildIndex > index;
    if (hasNoLeftChildInHeap) {
      return;
    }

    if (rightChildIndex > index) {
      if (compare(leftChild, item)) {
        [heap[leftChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[leftChildIndex]];
        swapWithChildIfNeeded(item, leftChildIndex);
      }
      return;
    }

    let areLeftAndRightChildrenEquals: boolean;

    if (compare(leftChild, rightChild)) {
      if (compare(leftChild, item)) {
        [heap[leftChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[leftChildIndex]];
        swapWithChildIfNeeded(item, leftChildIndex);
      }
      return;
    } else if ((areLeftAndRightChildrenEquals = !compare(rightChild, leftChild))) {
      if (compare(leftChild, item)) {
        [heap[leftChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[leftChildIndex]];
        swapWithChildIfNeeded(item, leftChildIndex);
      }
      return;
    }

    if (compare(rightChild, leftChild)) {
      if (compare(rightChild, item)) {
        [heap[rightChildIndex], heap[itemIndex]] = [heap[itemIndex], heap[rightChildIndex]];
        swapWithChildIfNeeded(item, rightChildIndex);
      }
    }
  }

  newArray.splice(0, length);

  mutableFilter(newArray);
  return newArray;
}
