import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import createLocation from 'history/lib/createLocation';
import routes from './src/routes';
import { Provider } from 'react-redux';
import {configureStore} from './src/lib/configureStore';
import fetchComponentData from './src/middleware/fetchComponentData';
import {ReduxRouter} from 'redux-react-router';

const app = express();

app.use(express.static(__dirname + '/'));

app.use((req, res) => {
  let location = createLocation(req.url)

  match({ routes, location }, (err, redirectLocation, renderProps) => {
    if (err) return console.error(err);

    if (!renderProps) return res.status(404).end('404');

    const store = configureStore();

    function renderView() {
      const InitialView = (
        <Provider store={store}>
            <ReduxRouter />
        </Provider>
      );

      const componentHTML = ReactDOMServer.renderToStaticMarkup(InitialView);

      const initialState = store.getState();

      const HTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>hello world</title>

          <script>
            window.__SERVER_PAYLOAD__ = ${JSON.stringify(renderProps)};
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          </script>

          <link href='/content/css/app.css' rel='stylesheet' type='text/css'>
        </head>
        <body class="theme-default">
          <div id="app">${componentHTML}</div>
          <script type="application/javascript" src="/static/bundle.js"></script>
        </body>
      </html>
      `;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components)
      .then(renderView)
      .then(html => res.end(html))
      .catch(error => res.end(error.message));
  });
});

export default app;
