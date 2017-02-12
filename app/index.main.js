import { app } from 'electron';
import { env } from 'utils';

const debug = require('debug')('lsv:entryPoint');

if (env.isProd()) {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  app.commandLine.appendSwitch('remote-debugging-port', '8090');
  app.commandLine.appendSwitch('debug', '5858');
  require('module').globalPaths.push(p); // eslint-disable-line
}

const installExtensions = async () => {
  if (env.isDev()) {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    for (const name of extensions) { // eslint-disable-line
      try {
        await installer.default(installer[name], forceDownload); // eslint-disable-line
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  debug('App ready');
  require('api/PersistentSettings'); // eslint-disable-line global-require
  await installExtensions();
  require('main.development'); // eslint-disable-line global-require
});
