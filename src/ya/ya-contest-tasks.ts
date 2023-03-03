export function countJewelryInRocks(jewelry: string, rocks: string): number {
  const jewelrySet = new Set(jewelry.split(''));

  let count = 0;
  for (let index = 0; index < rocks.length; index++) {
    const rock = rocks[index];
    if (jewelrySet.has(rock)) {
      count++;
    }
  }

  return count;
}

export function countOnesInBinaryVector(stringLength: string, ...vector: string[]): number {
  let maxSequence = 0;
  let currentSequence = 0;
  const length = parseInt(stringLength, 10);

  for (let index = 0; index < length; index++) {
    const char = vector[index];
    if (char === '1') {
      currentSequence++;
    } else {
      if (currentSequence > maxSequence) {
        maxSequence = currentSequence;
      }
      currentSequence = 0;
    }
  }

  if (currentSequence > maxSequence) {
    maxSequence = currentSequence;
  }

  return maxSequence;
}

export function disinct(stringLength: string, ...vector: string[]) {
  const set = new Set(vector);
  return Array.from(set);
}

type X = string;
type Y = string;
export type Coors = [X, Y];
type CityNumber = string;

type City = {
  [linkedCityNumber: string]: number;
};

function buildRoutesNotExceedMaxLength(citiesMap: Coors[], maxRouteLength: number) {
  const cities: (City | undefined)[] = new Array(citiesMap.length).fill(undefined);

  for (let index = 0; index < citiesMap.length; index++) {
    const departmentCity = citiesMap[index];

    for (let jindex = index + 1; jindex < citiesMap.length; jindex++) {
      const destinationCity = citiesMap[jindex];

      const xDiff = Math.abs(+departmentCity[0] - +destinationCity[0]);
      const yDiff = Math.abs(+departmentCity[1] - +destinationCity[1]);

      const length = xDiff + yDiff;

      if (length <= maxRouteLength) {
        let city1 = cities[index];
        if (!city1) {
          city1 = cities[index] = {};
        }
        city1[jindex] = length;

        let city2 = cities[jindex];
        if (!city2) {
          city2 = cities[jindex] = {};
        }
        city2[index] = length;
      }
    }
  }

  return cities;
}

export function getShortestRoutes(
  citiesMap: Coors[],
  maxRouteLength: number,
  travelDirection: [CityNumber, CityNumber]
) {
  const [targetDepartment, targetDestination] = travelDirection;

  const cities = buildRoutesNotExceedMaxLength(citiesMap, maxRouteLength);

  const resultedCityRoutes: Set<number>[] = [];

  const departmentCity = cities[+targetDepartment - 1];
  if (departmentCity) {
    tryBuildRoute(new Set(), +targetDepartment - 1);
  }

  function tryBuildRoute(prevCityIndexes: Set<number>, currentCityIndex: number) {
    if (currentCityIndex === +targetDestination - 1) {
      resultedCityRoutes.push(prevCityIndexes);
      return;
    }

    const city = cities[currentCityIndex];
    if (!city) {
      return;
    }

    const notVisitedCities = Object.keys(city).filter((linkedCityIndex) => !prevCityIndexes.has(+linkedCityIndex));
    if (!notVisitedCities.length) {
      return;
    }

    const visitedCities = new Set(prevCityIndexes).add(currentCityIndex);

    return notVisitedCities.map((cityIndex) => {
      tryBuildRoute(visitedCities, +cityIndex);
    });
  }

  if (!resultedCityRoutes.length) {
    return -1;
  }

  const shortest = resultedCityRoutes.reduce((shortestRoute, currentRoute) => {
    if (currentRoute.size < shortestRoute.size) {
      return currentRoute;
    }
    return shortestRoute;
  });

  return shortest?.size ?? -1;
}
