import store from '../store';

export default function dispatchToRenderer (action) {
  store.dispatch(action); // dispatch on main process
  global.mainWindow.webContents.send('action', action); // dispatch on renderer
}
