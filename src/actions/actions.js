export const FETCH_INFO = 'FETCH_INFO';
export const UPDATE_INFO = 'UPDATE_INFO';

export function fetchInfo(url) {
  return {
    type: FETCH_INFO,
    async: true,
    url: url
  };
}

export function updateInfo(info) {
  return {
    type: UPDATE_INFO,
    info: { message: info }
  };
}
