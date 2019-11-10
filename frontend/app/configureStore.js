/**
 * Create the store with dynamic reducers
 */

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router/immutable';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { multiClientMiddleware } from 'redux-axios-middleware';
import clients from 'utils/clients';
import createReducer from './reducers';

export default function configureStore(initialState = {}, history) {
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
  const middlewares = [thunk, routerMiddleware(history), multiClientMiddleware(clients)];

  const enhancers = [applyMiddleware(...middlewares)];

  if (process.env.NODE_ENV === 'development') {
    const logger = createLogger({
      stateTransformer: state => state.toJs(),
      diff: true,
    });

    middlewares.push(logger);
  }

  const store = createStore(
    createReducer(),
    initialState,
    composeEnhancers(...enhancers),
  );

  store.injectedReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(createReducer(store.injectedReducers));
    });
  }

  return store;
}
