import expect from 'expect';
import moment from 'moment';
import * as reducers from '../../reducers/reducers';
import {
  UPDATE_INFO,
  FETCH_INFO_REQUEST,
  FETCH_INFO_SUCCESS
} from '../../actions/actions';

describe('reducer', () => {
  it('should handle a fetch info request', () => {
    const action = { type: FETCH_INFO_REQUEST };
    const expectedState = { isFetching: true };
    expect(reducers.info(null, action)).toEqual(expectedState);
  });

  it('should handle a fetch info success', () => {
    const timestamp = moment();
    const info = { message: 'hello world!' };
    const action = {
      type: FETCH_INFO_SUCCESS,
      res: {
        data: info
      },
      receivedAt: timestamp
    };
    const expectedState = {
      isFetching: false,
      info: info,
      lastUpdated: timestamp
    };
    expect(reducers.info(null, action)).toEqual(expectedState);
  });

  it('should handle updated info', () => {
    const timestamp = moment();
    const info = { message: 'hello new world!' };
    const action = {
      type: UPDATE_INFO,
      info: info,
      receivedAt: timestamp
    };
    const expectedState = {
      info: info,
      lastUpdated: timestamp
    };
    expect(reducers.info(null, action)).toEqual(expectedState);
  });
});
