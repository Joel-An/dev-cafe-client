import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import Popups from './components/popups/Popups';

import './index.scss';
import configureStore from './store';
import configureSocket from './socket';

const store = configureStore();
configureSocket(store);

const renderApp = () => {
  render(
    <Provider store={store}>
      <App />
      <Popups/>
    </Provider>,
    document.getElementById('root'),
  );
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./components/App', renderApp);
}

renderApp();
