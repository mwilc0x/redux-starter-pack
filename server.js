import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Router from 'react-router';
import Location from 'react-router/lib/Location';
import routes from './src/routes';
import { Provider } from 'react-redux';
import configureStore from './src/lib/configureStore';
import fetchComponentData from './src/middleware/fetchComponentData';

const app = express();

app.use(express.static(__dirname + '/'));

app.use((req, res) => {
  const location = new Location(req.path, req.query);

  Router.run(routes, location, (err, routeState) => {
    if (err) return console.error(err);

    if (!routeState) return res.status(404).end('404');

    const store = configureStore();

    function renderView() {
      const InitialView = (
        <Provider store={store}>
            <Router {...routeState} />
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
            window.__SERVER_PAYLOAD__ = ${JSON.stringify(routeState)};
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

    fetchComponentData(store.dispatch, routeState.components, routeState.params)
      .then(renderView)
      .then(html => res.end(html))
      .catch(error => res.end(error.message));
  });
});

export default app;
