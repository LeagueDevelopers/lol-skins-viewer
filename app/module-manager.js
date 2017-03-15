import EventEmitter from 'events';
import { configureStore, configureReducers } from 'store';

import * as builtinModules from './modules';

export default class ModuleManager extends EventEmitter {
  static async initialize () {
    const runner = new ModuleManager();
    await Promise.all(Object.values(builtinModules).map(runner.register));
    runner.initialized = true;
    runner.updateReducers();
    return runner;
  }

  constructor (initialModules = {}) {
    super();
    this.initialized = false;
    this.modules = initialModules;
    this.store = configureStore(this);

    this.updateReducers = this.updateReducers.bind(this);
    this.register = this.register.bind(this);
    this.getStore = this.getStore.bind(this);
    this.getReducers = this.getReducers.bind(this);
    this.getModules = this.getModules.bind(this);
    this.getRoutes = this.getRoutes.bind(this);
  }

  updateReducers () {
    this.store.replaceReducer(configureReducers(this.getReducers()));
  }

  register (newModule) {
    this.modules[newModule.name] = newModule;
    this.updateReducers();
    if (this.initialized) {
      this.updateReducers();
      this.emit('module-loaded', newModule);
    }
    return Promise.resolve();
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
        routes.push({ ...m.route, key: m.name });
      }
      return routes;
    }, []);
  }
}
