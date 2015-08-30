export default function promiseMiddleware() {
  return next => action => {
    const { promise, types, ...rest } = action;

    if (!promise) return next(action);

    next({ ...rest, type: types[0] });

    return promise
      .then(res => {
        next({ ...rest, res, type: types[1] });
        return true;
      })
      .catch(error => {
        next({ ...rest, error, type: types[2] });
        return false;
      });
  };
}
