export default function promiseMiddleware(
  redux,
  moment = require('moment')
) {
  return next => action => next({ ...action, receivedAt: moment() });
}
