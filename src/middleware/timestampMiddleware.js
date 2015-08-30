export default function timestampMiddleware(
  redux,
  moment = require('moment')
) {
  return next => action => next({ ...action, receivedAt: moment() });
}
