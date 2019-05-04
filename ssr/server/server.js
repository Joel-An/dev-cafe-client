/* eslint-disable import/first */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-console */
import express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { HelmetProvider } from 'react-helmet-async';

// Dev
import { getDevServerBundleUrl } from 'universal-hot-reload';
import webpackClientConfig from '../webpack.hot.client.dev.config';

// Rendering
import App from '../../src/components/App';
import ToastNotifier from '../../src/components/toastNotifications/ToastNotifier';
import Routes from '../../src/components/Routes';
import configureStore from '../../src/store';

const isDev = process.env.NODE_ENV === 'development';

const devBundleUrl = getDevServerBundleUrl(webpackClientConfig);
const prodBundleUrl = '/dist/app.js';

const bundleUrl = isDev ? devBundleUrl : prodBundleUrl;

const prodCssUrl = '/dist/app.css';

const app = express();

app.use('/robot.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /admin/');
});

app.use('/dist', express.static('dist'));

app.use((req, res) => {
  console.log('req', req.url);
  const context = {};
  const helmetContext = {};

  const store = configureStore();
  const promises = store.runSaga().toPromise();

  const matchingRoutes = matchRoutes(Routes, req.path);
  const [matchRoute] = matchingRoutes;
  const { mapUrlToActions } = matchRoute.route;
  const fetchActions = mapUrlToActions(req.url);

  fetchActions.forEach((action) => {
    store.dispatch(action);
  });

  return promises.then(() => {
    const rootComp = (
      <HelmetProvider context={helmetContext}>
        <Provider store={store} >
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
          <ToastNotifier/>
        </Provider>
      </HelmetProvider>
    );

    const initialState = JSON.stringify(store.getState()).replace(
      /</g,
      '\\u003c',
    );

    const renderedApp = renderToString(rootComp);
    const { helmet } = helmetContext;

    res.status(200);
    res.send(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      <link rel="shortcut icon" href="/dist/favicon.ico">
      <link href=${prodCssUrl} rel="stylesheet">
    </head>
    <body>
      <div id="root">${renderedApp}</div>
      <script type="text/javascript" charset="utf-8">
        window.__INITIAL_STATE__ = ${initialState};
      </script>
      <script type="text/javascript" src=${bundleUrl}></script>
    </body>
   </html>`);
  }).catch((e) => {
    console.log(e.message);
    res.status(500).send(e.message);
  });
});

const port = 8000;

export default app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
