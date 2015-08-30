export default function timestampMiddleware(moment) {
  return () => next => action => next({ ...action, receivedAt: moment() });
}
