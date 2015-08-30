export default function apiMiddleware(client) {
  return () => next => action => {
    if (!action) return next(action);

    const { async, url, type, ...rest } = action;

    if (!async) return next(action);

    const promise = client.get(url);

    return next({ promise: promise, type });
  };
}
