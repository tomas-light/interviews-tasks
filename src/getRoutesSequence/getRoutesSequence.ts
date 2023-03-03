export type Route<City extends string> = { from: City; to: City };

export function getRoutesSequence<City extends string>(routes: Route<City>[]) {
  const routeMap = new Map(routes.map((route) => [route.from, route.to] as const));

  let [currentRoute] = routes;
  const sortedRoutes: Route<City>[] = [currentRoute];

  for (let index = 0; index < routeMap.size - 2; index++) {
    const nextRoute = routeMap.get(currentRoute.to);
    if (nextRoute) {
      currentRoute = { from: currentRoute.to, to: nextRoute };
      sortedRoutes.push(currentRoute);
    }
  }

  return sortedRoutes;
}
