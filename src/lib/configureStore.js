import {createStore, applyMiddleware, compose} from 'redux';
import {reduxReactRouter as clientRouter} from 'redux-router';
import {reduxReactRouter as serverRouter} from 'redux-router/server';
import routes from '../routes';
import createHistory from 'history/lib/createMemoryHistory';
import rootReducer from '../reducers/reducers';
import apiMiddleware from '../middleware/apiMiddleware';
import promiseMiddleware from '../middleware/promiseMiddleware';
import timestampMiddleware from '../middleware/timestampMiddleware';
import axios from 'axios';
import moment from 'moment';

export function configureStore(target, initialState) {
  let router;
  if (target === 'client') {
    router = clientRouter({createHistory});
  } else if (target === 'server') {
    router = serverRouter({routes});
  }

  return compose(
    applyMiddleware(
      apiMiddleware(axios),
      promiseMiddleware,
      timestampMiddleware(moment)
    ),
    router
  )(createStore)(rootReducer, initialState);
}
