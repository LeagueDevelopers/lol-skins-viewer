import fs from 'fs-promise';
import path from 'path';
import watch from 'watch';
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

async function onLockfile (filePath) {
  debug('Reading Lockfile %s', filePath);
  const file = await fs.readFile(filePath, { encoding: 'utf8' });
  if (!file) {
    return false;
  }
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

async function exists (filePath) {
  try {
    return await fs.exists(filePath, fs.constants.F_OK);
  } catch (e) {
    return false;
  }
}

export default {
  async start () {
    if (watcher) {
      watcher.stop();
      watcher = null;
    }
    const clientPath = await PersistentSettings.getClientPath();
    const lockfilePath = path.resolve(clientPath, 'lockfile');
    if (await exists(lockfilePath)) {
      onLockfile(lockfilePath);
    }
    return await new Promise(resolve => {
      watch.createMonitor(clientPath, {
        interval: 5,
        filter: fullpath => path.normalize(fullpath) === lockfilePath
      }, monitor => {
        monitor.on('created', f => onLockfile(f));
        monitor.on('changed', f => onLockfile(f));
        monitor.on('removed', () => dispatchToRenderer(down()));
        watcher = monitor;
        resolve(monitor);
      });
    });
  },

  stop () {
    if (watcher) {
      watcher.stop();
      watcher = null;
    }
  },

  getWatcher () {
    return watcher;
  }
};
