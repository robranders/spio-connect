module.exports = (appRef, dynRouteRef) => {
  const defaultRoutes = [];

  appRef.locals.dynamicRoutes = defaultRoutes;

  const updateRoutes = (name, path, method) => {
    const { dynamicRoutes } = appRef.locals;
    if (!Array.isArray(dynamicRoutes)) {
      return { err: "dynamic routes not initialized" };
    }

    const existingRoute = dynamicRoutes.find((x) => x.path === path);
    if (existingRoute) return { err: "path already exists" };

    dynRouteRef[method](path, (req, res) => {
      console.log(`${method} on ${path}`);
      res.send(name);
    });

    dynamicRoutes.push({ name, path, active: 1, method });

    return { err: null };
  };

  return updateRoutes;
};
