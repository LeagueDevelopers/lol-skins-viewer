import { ipcRenderer } from 'electron';
import logger from 'loglevel';

import configureStore from './configureStore';

const initialState = ipcRenderer.sendSync('getState');
logger.debug('Hydrating state from Main Process', initialState);
const store = configureStore(initialState);

ipcRenderer.on('action', (event, action) => {
  if (typeof action === 'object' && action.type) {
    return store.dispatch(action);
  }
  logger.error('Received invalid action', action);
});

export default store;
