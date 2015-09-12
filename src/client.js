import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import configureStore from './lib/configureStore';

const store = configureStore(window.__INITIAL_STATE__);

ReactDOM.render(
  <Provider store={store}>
      <Router children={routes} />
  </Provider>,
  document.getElementById('app')
);
