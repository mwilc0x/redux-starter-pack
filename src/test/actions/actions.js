import expect from 'expect';
import * as actions from '../../actions/actions';
import { config } from '../../config';

describe('actions', () => {
  it('should create an action to fetch info', () => {
    const expectedAction = {
      types: [
        actions.FETCH_INFO_REQUEST,
        actions.FETCH_INFO_SUCCESS,
        actions.FETCH_INFO_FAILURE
      ],
      request: true,
      url: config.url.info
    };
    expect(actions.fetchInfo(config.url.info)).toEqual(expectedAction);
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
