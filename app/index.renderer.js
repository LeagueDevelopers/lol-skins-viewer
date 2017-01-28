import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import logger from 'loglevel';

import routes from './routes';
import store from './store';

import './app.global.scss';

if (process.env.NODE_ENV === 'development') logger.setLevel(1, false);

const history = syncHistoryWithStore(hashHistory, store);

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
