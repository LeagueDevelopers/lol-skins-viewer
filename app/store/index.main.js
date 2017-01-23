import { ipcMain } from 'electron';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const debug = require('debug')('lsv:store');

const enhancer = applyMiddleware(thunk);

const store = createStore(rootReducer, {}, enhancer);

/**
 * Dispatch actions received from Renderer process
 */
ipcMain.on('action', (event, action) => {
  if (typeof action === 'object' && action.type) {
    return store.dispatch(action);
  }
  debug('Received invalid action %O', action);
});

/*
 Pass state over to renderer, used when reloading the process
 */
ipcMain.on('getState', (event) => {
  event.returnValue = store.getState(); //eslint-disable-line
});

export default store;
