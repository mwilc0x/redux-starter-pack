import expect from 'expect';
import * as actions from '../../actions/actions';

describe('actions', () => {
  it('should create an action to fetch info', () => {
    const url = 'http://localhost:8080/content/json/info.json';
    const expectedAction = {
      type: actions.FETCH_INFO,
      async: true,
      url: url
    };
    expect(actions.fetchInfo(url)).toEqual(expectedAction);
  });

  it('should create an action to update info', () => {
    const info = 'updated info';
    const expectedAction = {
      type: actions.UPDATE_INFO,
      info: { message: info }
    };
    expect(actions.updateInfo(info)).toEqual(expectedAction);
  });
});
