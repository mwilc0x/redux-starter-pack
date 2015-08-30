export const FETCH_INFO_REQUEST = 'FETCH_INFO_REQUEST';
export const FETCH_INFO_SUCCESS = 'FETCH_INFO_SUCCESS';
export const FETCH_INFO_FAILURE = 'FETCH_INFO_FAILURE';
export const UPDATE_INFO = 'UPDATE_INFO';

export function fetchInfo(url) {
  return {
    types: [
      FETCH_INFO_REQUEST,
      FETCH_INFO_SUCCESS,
      FETCH_INFO_FAILURE
    ],
    request: true,
    url: url
  };
}

export function updateInfo(info) {
  return {
    type: UPDATE_INFO,
    info: { message: info }
  };
}
