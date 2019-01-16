/* eslint-disable no-underscore-dangle */
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore(extraMiddlewares = []) {
  const saga = createSagaMiddleware();
  const middlewares = [saga, ...extraMiddlewares];

  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(
      applyMiddleware(...middlewares),
    ),
  );

  saga.run(rootSaga);
  store.close = () => store.dispatch(END);


  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
