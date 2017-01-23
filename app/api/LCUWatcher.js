import fs from 'fs';
import path from 'path';
import chokidar from 'chokidar';
import { dispatchToRenderer, parseLockfile, processIsRunning } from 'utils';
import { down, up, login } from 'actions/app';
import store from '../store';
import PersistentSettings from './PersistentSettings';
import { getCurrentSummoner } from './SummonerController';

const debug = require('debug')('lsv:LCUWatcher');

let poll = null;
let watcher = null;

function pollLogin () {
  const { port, password } = store.getState().app.lcu;
  if (!port || !password) {
    return false;
  }
  debug('Polling LCU for Login');
  return getCurrentSummoner(port, password)
      .then(s => {
        debug('Summoner received %O', s);
        dispatchToRenderer(login(s));
        return s;
      })
      .catch(err => {
        debug('Error polling for LCU login, %s', err.message);
        if (poll) clearTimeout(poll);
        poll = setTimeout(pollLogin, 15000);
      });
}

function onLockfile (filePath) {
  const file = fs.readFileSync(filePath, { encoding: 'utf8' });
  debug('Found Lockfile %s', file);

  const lcuInstance = parseLockfile(file);
  debug('Parsed Lockfile %O', lcuInstance);

  if (
    lcuInstance.process === 'LeagueClient'
    && lcuInstance.port
    && lcuInstance.password
    && processIsRunning(lcuInstance.pid)
  ) {
    dispatchToRenderer(up(lcuInstance));
    return pollLogin();
  }
}

export default {
  async start () {
    if (watcher) {
      watcher.close();
      watcher = null;
    }
    const clientPath = await PersistentSettings.getClientPath();
    watcher = chokidar.watch(path.join(clientPath, 'lockfile'), {
      interval: 3000,
      awaitWriteFinish: true
    })
        .on('error', debug) // TODO: Might want to show something on the UI
        .on('add', onLockfile)
        .on('change', onLockfile)
        .on('unlink', () => dispatchToRenderer(down()));
    return watcher;
  },

  stop () {
    if (watcher) {
      watcher.close();
      watcher = null;
    }
  },

  getWatcher () {
    return watcher;
  }
};
