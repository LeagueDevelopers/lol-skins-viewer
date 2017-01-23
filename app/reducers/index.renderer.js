// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from './app';
import skins from './skins';
import settings from './settings';

const rootReducer = combineReducers({
  routing,
  app,
  skins,
  settings
});

export default rootReducer;
