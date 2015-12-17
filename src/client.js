import React from 'react';
import ReactDOM from 'react-dom';
import {ReduxRouter} from 'redux-router';
import { Provider } from 'react-redux';
import {configureStore} from './lib/configureStore';
import routes from './routes';
const store = configureStore('client', window.__INITIAL_STATE__);

ReactDOM.render(
  <Provider store={store}>
      <ReduxRouter routes={routes} />
  </Provider>,
  document.getElementById('app')
);
