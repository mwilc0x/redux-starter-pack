import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers/reducers';
import apiMiddleware from '../middleware/apiMiddleware';
import promiseMiddleware from '../middleware/promiseMiddleware';
import timestampMiddleware from '../middleware/timestampMiddleware';
import axios from 'axios';
import moment from 'moment';

const createStoreWithMiddleware = applyMiddleware(
  apiMiddleware(axios),
  promiseMiddleware,
  timestampMiddleware(moment),
  loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
