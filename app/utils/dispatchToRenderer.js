import store from '../store';

/**
 * dispatchToRenderer
 *
 * Dispatches an action to the renderer and to the
 * store on the main process. Dispatching on the main
 * process ensures we can hydrate the renderer
 *
 * @param {Object} action An FSA compliant action to dispatch
 */
export default function dispatchToRenderer (action) {
  store.dispatch(action); // dispatch on main process
  global.mainWindow.webContents.send('action', action); // dispatch on renderer
}
