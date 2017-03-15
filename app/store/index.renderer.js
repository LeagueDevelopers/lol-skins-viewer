import { ipcRenderer } from 'electron';
import logger from 'loglevel';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware, push } from 'react-router-redux';
import createLogger from 'redux-logger';
import merge from 'lodash.merge';
import * as defaultReducers from '../reducers';
import appActionCreators from '../actions/app';

const actionCreators = {
  ...appActionCreators,
  push
};

const reduxLogger = createLogger({
  level: 'info',
  collapsed: true
});

const router = routerMiddleware(hashHistory);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose;
/* eslint-enable no-underscore-dangle */

const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, reduxLogger)
);

export function configureReducers (dynamicReducers = {}) {
  return combineReducers({
    ...defaultReducers,
    ...dynamicReducers
  });
}

export function configureStore (moduleManager, initialState) {
  const mainProcessState = ipcRenderer.sendSync('getState');
  logger.debug('Hydrating state from Main Process', mainProcessState);
  merge(initialState, mainProcessState);

  const rootReducer = configureReducers(moduleManager.getReducers());
  const store = createStore(rootReducer, initialState, enhancer);

  ipcRenderer.on('action', (event, action) => {
    if (typeof action === 'object' && action.type) {
      return store.dispatch(action);
    }
    logger.error('Received invalid action', action);
  });

  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}
