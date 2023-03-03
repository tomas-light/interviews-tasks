import { Route, getRoutesSequence } from './getRoutesSequence';

const cities = [
  //
  'London',
  'Moscow',
  'NY',
  'SPb',
  'Belgrade',
  'Novosibirsk',
  'Atlanta',
] as const;

type City = (typeof cities)[number];

test('case 1', () => {
  const randomRoutes: Route<City>[] = [
    { from: 'Moscow', to: 'Atlanta' },
    { from: 'NY', to: 'Novosibirsk' },
    { from: 'SPb', to: 'Belgrade' },
    { from: 'Belgrade', to: 'London' },
    { from: 'Novosibirsk', to: 'SPb' },
    { from: 'Atlanta', to: 'NY' },
    { from: 'London', to: 'Moscow' },
  ];

  const sortedRoutes = getRoutesSequence(randomRoutes);
  const expectedRoutes: Route<City>[] = [
    {
      from: 'Moscow',
      to: 'Atlanta',
    },
    {
      from: 'Atlanta',
      to: 'NY',
    },
    {
      from: 'NY',
      to: 'Novosibirsk',
    },
    {
      from: 'Novosibirsk',
      to: 'SPb',
    },
    {
      from: 'SPb',
      to: 'Belgrade',
    },
    {
      from: 'Belgrade',
      to: 'London',
    },
  ];

  expect(sortedRoutes).toEqual(expectedRoutes);
});

/**
 * simple helper, it does not generate full right list of routes, it does not omit loops or from-to checks
 * it just a little help
 * */
function prepareRandomRoutes<City extends string>(cities: City[]) {
  const tempCities = [...cities];

  const randomRoutes = cities.reduce((routes, city) => {
    const pseudoRandomIndex = Math.floor(Math.random() * tempCities.length);
    const targetCity = tempCities.splice(pseudoRandomIndex, 1)[0];

    const route: Route<City> = {
      from: city,
      to: targetCity,
    };
    routes.push(route);
    return routes;
  }, [] as Route<City>[]);

  return randomRoutes;
}
