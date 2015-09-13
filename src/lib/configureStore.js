import { createStore, applyMiddleware, compose } from 'redux';
import { reduxReactRouter } from 'redux-react-router';
import routes from '../routes';
import createHistory from 'history/lib/createMemoryHistory';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers/reducers';
import apiMiddleware from '../middleware/apiMiddleware';
import promiseMiddleware from '../middleware/promiseMiddleware';
import timestampMiddleware from '../middleware/timestampMiddleware';
import axios from 'axios';
import moment from 'moment';

const createStoreWithMiddleware = compose(
  applyMiddleware(
    apiMiddleware(axios),
    promiseMiddleware,
    timestampMiddleware(moment),
    loggerMiddleware
  ),
  reduxReactRouter({
    routes,
    createHistory
  })
)(createStore);

export function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
