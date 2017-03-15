import { app, BrowserWindow, Menu } from 'electron';
import PersistentSettings from 'api/PersistentSettings';
import LCUWatcher from 'api/LCUWatcher';
import LCUProxy from 'api/LCUProxy';
import { env } from 'utils';
import AutoUpdater from './auto-updater';
import store from './store';

const debug = require('debug')('lsv:main');

let menu;
let template;
let mainWindow = null;

global.LCUWatcher = LCUWatcher;
global.store = store;

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
  event.preventDefault();
  callback(true);
});

(async () => {
  debug('Running main script');
  const initialScaleFactor = await PersistentSettings.getScaleFactor();
  debug(initialScaleFactor);
  const initialDimensions = await PersistentSettings.getDimensions();
  debug(initialDimensions);

  mainWindow = new BrowserWindow({
    show: env.isDev(),
    width: initialDimensions.width,
  //  maxWidth: 1600,
    minWidth: 1024,
    height: initialDimensions.height,
  //  maxHeight: 900,
    minHeight: 540,
    frame: false,
    resizable: true,
    fullscreenable: false,
    titleBarStyle: false,
    webPreferences: {
      zoomFactor: initialScaleFactor
    }
  });

  AutoUpdater(mainWindow);

  global.mainWindow = mainWindow;

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.show();
    mainWindow.focus();
    LCUProxy.start();
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  if (env.isDev()) {
    mainWindow.openDevTools();
    mainWindow.webContents.on('context-menu', (e, props) => {
      const { x, y } = props;

      Menu.buildFromTemplate([{
        label: 'Inspect element',
        click () {
          mainWindow.inspectElement(x, y);
        }
      }]).popup(mainWindow);
    });
  }

  template = [{
    label: '&File',
    submenu: [{
      label: '&Open',
      accelerator: 'Ctrl+O'
    }, {
      label: '&Close',
      accelerator: 'Ctrl+W',
      click () {
        mainWindow.close();
      }
    }]
  }, {
    label: '&View',
    submenu: (env.isDev()) ? [{
      label: '&Reload',
      accelerator: 'Ctrl+R',
      click () {
        mainWindow.webContents.reload();
      }
    }, {
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click () {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }, {
      label: 'Toggle &Developer Tools',
      accelerator: 'Alt+Ctrl+I',
      click () {
        mainWindow.toggleDevTools();
      }
    }] : [{
      label: 'Toggle &Full Screen',
      accelerator: 'F11',
      click () {
        mainWindow.setFullScreen(!mainWindow.isFullScreen());
      }
    }]
  }];
  menu = Menu.buildFromTemplate(template);
  mainWindow.setMenu(menu);
})();
