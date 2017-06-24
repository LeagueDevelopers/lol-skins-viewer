import logger from 'loglevel';
import u from 'updeep';

const DEFAULT_STATE = {
  lcu: false,
  proxy: 0,
  summoner: false,
  errors: [],
  updateProgress: 0,
  newVersion: false
};

export default function app (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'PROXY_UP':
      return u({ proxy: action.payload }, state);
    case 'LCU_UP':
      return u({ lcu: action.payload }, state);
    case 'LCU_LOGIN':
      return u({ summoner: action.payload }, state);
    case 'LCU_DOWN':
      return u({ lcu: false, summoner: false }, state);
    case 'NEW_VERSION':
      return u({ newVersion: action.payload }, state);
    case 'UPDATE_PROGRESS':
      return u({ updateProgress: action.payload }, state);
    case 'ERROR':
      logger.error(action.payload);
      return u({ errors: state.errors.concat([action.payload]) }, state);
    default:
      return state;
  }
}
