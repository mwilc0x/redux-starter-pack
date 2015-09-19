import {createStore, applyMiddleware, compose} from 'redux';
import {reduxReactRouter as clientRouter} from 'redux-router';
import {reduxReactRouter as serverRouter} from 'redux-router/server';
import routes from '../routes';
import createHistory from 'history/lib/createMemoryHistory';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers/reducers';
import apiMiddleware from '../middleware/apiMiddleware';
import promiseMiddleware from '../middleware/promiseMiddleware';
import timestampMiddleware from '../middleware/timestampMiddleware';
import axios from 'axios';
import moment from 'moment';

function createRouter(args, router) {
  const {routes, createHistory} = args;
  return router({ routes, createHistory })
}

export function configureStore(target, initialState) {
  let router;

  if (target === 'client') {
    initialState.router = null;
    router = createRouter({routes, createHistory}, clientRouter)
  } else if (target === 'server') {
    router = createRouter({routes}, serverRouter)
  }

  return compose(
    applyMiddleware(
      apiMiddleware(axios),
      promiseMiddleware,
      timestampMiddleware(moment),
      loggerMiddleware
    ),
    router
  )(createStore)(rootReducer, initialState);
}
