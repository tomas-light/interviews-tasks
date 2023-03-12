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
