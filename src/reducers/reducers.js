import { combineReducers } from 'redux';
import { UPDATE_INFO } from '../actions/actions';

export const FETCH_INFO_REQUEST = 'FETCH_INFO_REQUEST';
export const FETCH_INFO_SUCCESS = 'FETCH_INFO_SUCCESS';
export const FETCH_INFO_FAILURE = 'FETCH_INFO_FAILURE';

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

export default combineReducers({info});
