// @flow
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from './app';
import skins from './skins';
import toasts from './toasts';
import share from './share';
import settings from './settings';
import releaseNotes from './releaseNotes';

const rootReducer = combineReducers({
  routing,
  app,
  toasts,
  share,
  skins,
  settings,
  releaseNotes
});

export default rootReducer;
