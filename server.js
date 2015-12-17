import express from "express";
import React from "react";
import { renderToString } from 'react-dom/server';
import {RoutingContext, match} from "react-router";
import {ReduxRouter} from 'redux-router';
import { createLocation } from 'history'
import routes from "./src/routes";
import { Provider } from 'react-redux';
import { configureStore } from './src/lib/configureStore';
import fetchComponentData from './src/middleware/fetchComponentData';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';

const server = express();

var config = {};
var host = config.host || 'localhost';
var port = (config.port + 1) || 3001;

var serverOptions = {
  contentBase: 'http://' + host + ':' + port,
  quiet: true,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: webpackConfig.output.publicPath,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {colors: true}
};

// Use this middleware to set up hot module reloading via webpack.
const compiler = webpack(webpackConfig)
server.use(webpackDevMiddleware(compiler, serverOptions))
server.use(webpackHotMiddleware(compiler))

server.use(express.static(__dirname + "/"));

server.use((req, res) => {
  const location = createLocation(req.url);

  const store = configureStore('server');

  match({ routes, location: "/" }, (err, redirectLocation, renderProps) => {

    if(err) return console.error(err);

    if(!renderProps) return res.status(404).end('404');

    function renderView() {
      const InitialView = (
        <Provider store={store}>
            <ReduxRouter />
        </Provider>
      );

      const componentHTML = renderToString(InitialView);

      const initialState = store.getState();

      const HTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>bio.</title>

            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
            </script>

            <link href='http://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
            <link href='/content/css/app.css' rel='stylesheet' type='text/css'>
          </head>
          <body class="theme-default">
            <div id="app">${componentHTML}</div>
            <script type="application/javascript" src="/static/bundle.js"></script>
          </body>
        </html>`;

      return HTML;
    }

    fetchComponentData(store.dispatch, renderProps.components)
      .then(renderView)
      .then(html => res.end(html))
      .catch(err => res.end(err.message));
  });
});

export { server };
