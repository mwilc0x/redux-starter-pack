export default function promiseMiddleware(
  redux,
  axios = require('axios')
) {
  return next => action => {
    const { async, type, ...rest } = action;

    if (!async) return next(action);

    const REQUEST = type + '_REQUEST';
    const SUCCESS = type + '_SUCCESS';
    const FAILURE = type + '_FAILURE';

    next({ ...rest, type: REQUEST });

    return axios.get(async.url)
      .then(res => {
        next({ ...rest, res, type: SUCCESS });
        return true;
      })
      .catch(error => {
        next({ ...rest, error, type: FAILURE });

        return false;
      });
  };
}
