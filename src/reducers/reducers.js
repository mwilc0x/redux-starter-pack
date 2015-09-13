import { combineReducers } from 'redux';
import {routerStateReducer} from 'redux-react-router';

import {
  UPDATE_INFO,
  FETCH_INFO_REQUEST,
  FETCH_INFO_SUCCESS
} from '../actions/actions';

export function info(state = {
  isFetching: false,
  info: {}
}, action) {
  switch (action.type) {
  case FETCH_INFO_REQUEST:
    return Object.assign({}, state, {
      isFetching: true
    });
  case FETCH_INFO_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      info: action.res.data,
      lastUpdated: action.receivedAt
    });
  case UPDATE_INFO:
    return Object.assign({}, state, {
      info: action.info,
      lastUpdated: action.receivedAt
    });
  default:
    return state;
  }
}

export default combineReducers({
  router: routerStateReducer,
  info
});
