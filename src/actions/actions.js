export const FETCH_INFO = 'FETCH_INFO';
export const UPDATE_INFO = 'UPDATE_INFO';

export function fetchInfo() {
  return {
    type: FETCH_INFO,
    async: {
      url: 'http://localhost:8080/content/json/info.json'
    }
  };
}

export function updateInfo(info) {
  return {
    type: UPDATE_INFO,
    info: { message: info }
  };
}
