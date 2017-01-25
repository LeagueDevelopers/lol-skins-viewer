import _settings from 'electron-settings';
import u from 'updeep';
import { validatePathSync } from 'utils';

/* TODO: We should calculate the initial redux state in the
 * main process before the window is shown (or show a loading screen).
 * Ideally there should be no fs Sync functions
 */
function getDefaultState () {
  return {
    clientPath: {
      ...validatePathSync(_settings.getSync('clientPath')),
      hasChanged: false
    },
    scale: {
      value: _settings.getSync('scale'),
      isValid: true,
      hasChanged: false
    }
  };
}

/**
 * Structure of a setting:
 * settingName: {
 *    value: Any,
 *    isValid: Boolean,
 *    hasChanged: Boolean,
 *    ...otherProps
 * }
 */
const DEFAULT_STATE = getDefaultState();

function hasChanged (current, initial = DEFAULT_STATE) {
  return {
    ...current,
    hasChanged: current.value !== initial.clientPath.value
  };
}

export default function settings (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'PATH_CHANGE':
      return u({ clientPath: hasChanged(action.payload) }, state);
    case 'SCALE_CHANGE':
      return u({ scale: { value: action.payload, hasChanged: true } }, state);
    case 'RESET_SETTING':
      return u({ [action.payload]: getDefaultState()[action.payload] }, state);
    case 'SETTINGS_RESET':
    case 'SETTINGS_SAVE':
      return getDefaultState();
    default:
      return state;
  }
}
