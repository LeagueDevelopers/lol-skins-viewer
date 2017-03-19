import electron from 'electron';
import logger from 'loglevel';
import EventEmitter from 'events';
import { configureStore, configureReducers } from 'store';

import * as builtinModules from './modules';

export default class ModuleManager extends EventEmitter {
  static async initialize () {
    const manager = new ModuleManager();
    Object.values(builtinModules).map(manager.registerSync);
   // manager.register('C:\\projects\\modules\\test.js');
    manager.initialized = true;
    manager.updateReducers();
    return manager;
  }

  constructor (initialModules = {}) {
    super();
    this.initialized = false;
    this.modules = initialModules;
    this.store = configureStore(this);

    this.updateReducers = this.updateReducers.bind(this);
    this.register = this.register.bind(this);
    this.registerSync = this.registerSync.bind(this);
    this.getStore = this.getStore.bind(this);
    this.getReducers = this.getReducers.bind(this);
    this.getModules = this.getModules.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
  }

  updateReducers () {
    this.store.replaceReducer(configureReducers(this.getReducers()));
  }

  async register (path) {
    /* eslint-disable global-require */
    /* eslint-disable import/no-dynamic-require */
    try {
      const newModule = await (function load () {
        const m = eval('require')(path);
        return Promise.resolve(m());
      }());
      this.registerSync.call(this, newModule);
    } catch (err) {
      logger.error(err);
    }
  }

  registerSync (newModule) {
    this.modules[newModule.name] = newModule;
    this.updateReducers();
    if (this.initialized) {
      this.updateReducers();
      this.emit('module-loaded', newModule);
    }
  }

  getStore () {
    return this.store;
  }

  getModules () {
    return this.modules;
  }

  getReducers () {
    return Object.keys(this.modules).reduce((reducers, moduleName) => {
      const m = this.modules[moduleName];
      if (m.reducer) {
        return { ...reducers, [moduleName]: m.reducer };
      }
      return reducers;
    }, {});
  }

  getRoutes () {
    return Object.keys(this.modules).reduce((routes, moduleName) => {
      const m = this.modules[moduleName];
      if (m.route) {
        routes.push({ ...m.route, key: m.name, name: moduleName });
      }
      return routes;
    }, []);
  }
}
