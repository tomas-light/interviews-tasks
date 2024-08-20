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

// let bracketPairsNumber = 0;
//
// rl.on('line', (line) => {
//   bracketPairsNumber = parseInt(line, 10);
// }).on('close', () => {
//   const LEFT_BRACKET = '(';
//   const RIGHT_BRACKET = ')';
//
//   if (bracketPairsNumber === 0) {
//     return;
//   }
//
//   const targetLength = bracketPairsNumber * 2;
//
//   const initialString = LEFT_BRACKET;
//   let combinations = [
//     {
//       string: initialString,
//       left: initialString.length,
//       right: 0,
//     },
//   ];
//
//   for (let brackets = initialString.length; brackets < targetLength; brackets++) {
//     const nextCombinations = [];
//
//     combinations.forEach(({ string, left, right }) => {
//       if (left < bracketPairsNumber) {
//         nextCombinations.push({
//           right,
//           left: left + 1,
//           string: string + LEFT_BRACKET,
//         });
//       }
//
//       if (right < left) {
//         nextCombinations.push({
//           right: right + 1,
//           left,
//           string: string + RIGHT_BRACKET,
//         });
//       }
//     });
//
//     combinations = nextCombinations;
//   }
//
//   combinations.forEach((line) => {
//     process.stdout.write(`${line.string.toString()}\n`);
//   });
// });

// rl.on('line', (line) => {
//   bracketPairsNumber = parseInt(line, 10);
// }).on('close', () => {
//   const combinations = [];
//   const targetLength = bracketPairsNumber * 2;
//
//   const leftBracket = '(';
//   const rightBracket = ')';
//
//   generateString('', 0, 0);
//   function generateString(currentString, left, right) {
//     if (currentString.length === targetLength) {
//       combinations.push(currentString);
//       return;
//     }
//
//     if (bracketPairsNumber > left) {
//       generateString(currentString + leftBracket, left + 1, right);
//     }
//
//     if (right < left) {
//       generateString(currentString + rightBracket, left, right + 1);
//     }
//   }
//
//   if (combinations && Array.isArray(combinations)) {
//     combinations.forEach((line) => {
//       process.stdout.write(`${line.toString()}\n`);
//     });
//   } else {
//     process.stdout.write(combinations.toString());
//   }
// });

const lines = [];

rl.on('line', (line) => {
  lines.push(line);

  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(() => rl.close(), 3000);
}).on('close', () => {
  const cityCountString = +lines[0];
  const coors = [];
  for (let index = 1; index <= cityCountString; index++) {
    const line = lines[index];
    const parsed = line.split(' ').map((str) => parseInt(str));
    coors.push(parsed);
  }

  const travelDestination = lines[lines.length - 1];
  const maxLengthString = lines[lines.length - 2];

  const maxLength = parseInt(maxLengthString);

  const shortestRoute = getShortestRoutes(coors, maxLength, travelDestination.split(' '));
  process.stdout.write(shortestRoute.toString());

  function buildRoutesNotExceedMaxLength(citiesMap, maxRouteLength) {
    const cities = new Array(citiesMap.length).fill(undefined);

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

  function getShortestRoutes(citiesMap, maxRouteLength, travelDirection) {
    const [targetDepartment, targetDestination] = travelDirection;

    const cities = buildRoutesNotExceedMaxLength(citiesMap, maxRouteLength);

    const resultedCityRoutes = [];

    const departmentCity = cities[+targetDepartment - 1];
    if (departmentCity) {
      tryBuildRoute(new Set(), +targetDepartment - 1);
    }

    function tryBuildRoute(prevCityIndexes, currentCityIndex) {
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
});

rl.close();
