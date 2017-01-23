import settings from 'electron-settings';
import logger from 'loglevel';
import { validSettingsSelector, hasChangesSelector, isValidSelector } from 'selectors/settings';

export function changeSetting (setting, nextValue) {
  switch (setting) {
    case 'clientPath':
      return {
        type: 'PATH_CHANGE',
        payload: nextValue
      };
    case 'scale':
      return {
        type: 'SCALE_CHANGE',
        payload: nextValue
      };
    default:
      return {
        type: 'ERROR',
        payload: 'Error changing settings, no arguments provided.',
        error: true
      };
  }
}

export function resetSetting (name) {
  if (!name) {
    return {
      type: 'ERROR',
      payload: 'Tried to reset invalid setting',
      error: true
    };
  }
  return {
    type: 'RESET_SETTING',
    payload: name
  };
}

export function resetSettings () {
  return {
    type: 'SETTINGS_RESET'
  };
}

export function saveSettings () {
  return (dispatch, getState) => {
    const state = getState();
    if (hasChangesSelector(state) && isValidSelector(state)) {
      validSettingsSelector(state).forEach(s => {
        logger.debug(`Set ${s.name} to ${s.value}`);
        settings.setSync(s.name, s.value);
      });
      dispatch({
        type: 'SETTINGS_SAVE'
      });
    }
  };
}
