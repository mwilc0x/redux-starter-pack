import React from 'react';
import ReactDOM from 'react-dom';
import {ReduxRouter} from 'redux-react-router';
import { Provider } from 'react-redux';
import {configureStore} from './lib/configureStore';

const store = configureStore(); // works

// const store = configureStore(window.__INITIAL_STATE__); // doesn't work :(

ReactDOM.render(
  <Provider store={store}>
      <ReduxRouter />
  </Provider>,
  document.getElementById('app')
);
