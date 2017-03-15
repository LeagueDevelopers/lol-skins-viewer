import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import logger from 'loglevel';

import Router from './routes';
import ModuleManager from './module-manager';

import './app.global.scss';

if (process.env.NODE_ENV === 'development') logger.setLevel(1, false);

ModuleManager.initialize().then(instance => {
  const store = instance.getStore();
  const routes = instance.getRoutes();
  const history = syncHistoryWithStore(hashHistory, store);

  return render(
    <Provider store={store}>
      <Router manager={instance} history={history} routes={routes} />
    </Provider>,
    document.getElementById('root')
  );
}).catch(logger.error);
