export default function apiMiddleware(client) {
  return () => next => action => {
    if (!action) return next(action);

    const { request, url, types, ...rest } = action;

    if (!request) return next(action);

    const promise = client.get(url);

    return next({ promise: promise, types });
  };
}
