import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from './app';
import bindings from './bindings';
import settings from './settings';
import releaseNotes from './releaseNotes';

const rootReducer = combineReducers({
  routing,
  app,
  bindings,
  settings,
  releaseNotes
});

export default rootReducer;
