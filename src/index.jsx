import React from 'react';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './components/App';
import Popups from './components/popups/Popups';
import NotificationCenter from './components/notifications/NotificationCenter';

import './index.scss';
import configureStore from './store';
import { configureSocket } from './socket';


// eslint-disable-next-line no-underscore-dangle
const initialState = window.__INITIAL_STATE__;

const store = configureStore(initialState);
store.runSaga();
configureSocket(store);

const renderApp = fn => () => {
  fn(
    <HelmetProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
        <Popups/>
        <NotificationCenter/>
      </Provider>
    </HelmetProvider>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp(render));
}

if (initialState) {
  // SSR
  renderApp(hydrate)();
} else {
  // Local
  renderApp(render)();
}
