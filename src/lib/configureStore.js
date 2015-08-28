import { createStore, applyMiddleware } from 'redux';
import loggerMiddleware from 'redux-logger';
import rootReducer from '../reducers/reducers';
import promiseMiddleware from '../middleware/promiseMiddleware';
import timestampMiddleware from '../middleware/timestampMiddleware';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  timestampMiddleware,
  loggerMiddleware
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
