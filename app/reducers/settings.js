import _settings from 'electron-settings';
import u from 'updeep';
import { validatePathSync } from 'utils';

/* TODO: We should calculate the initial redux state in the
 * main process before the window is shown (or show a loading screen).
 * Ideally there should be no fs Sync functions
 */
function getCurrentSettings () {
  return {
    clientPath: {
      ...validatePathSync(_settings.getSync('clientPath')),
      hasChanged: false
    },
    scale: {
      value: _settings.getSync('scale'),
      isValid: true,
      hasChanged: false
    },
    lowSpec: {
      value: _settings.getSync('lowSpec'),
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
let DEFAULT_STATE = getCurrentSettings();

function hasChanged (current, key, previous = DEFAULT_STATE) {
  return {
    value: current,
    hasChanged: current.value !== previous[key].value
  };
}

export default function settings (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'PATH_CHANGE': {
      const { value, ...otherProps } = action.payload;
      return u({ clientPath: { ...hasChanged(value, 'clientPath'), ...otherProps } }, state);
    }
    case 'SCALE_CHANGE':
      return u({ scale: hasChanged(action.payload, 'scale') }, state);
    case 'RESET_SETTING':
      return u({ [action.payload]: getCurrentSettings()[action.payload] }, state);
    case 'SETTINGS_RESET':
    case 'SETTINGS_SAVE':
      DEFAULT_STATE = getCurrentSettings();
      return DEFAULT_STATE;
    default:
      return state;
  }
}
