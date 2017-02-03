import settings from 'electron-settings';
import logger from 'loglevel';
import { validatePath } from 'utils';
import { validSettingsSelector, hasChangesSelector, isValidSelector } from 'selectors/settings';

export function changeSetting (setting, nextValue) {
  return async (dispatch) => {
    switch (setting) {
      case 'clientPath': {
        const nextPath = await validatePath(nextValue);
        return dispatch({
          type: 'PATH_CHANGE',
          payload: nextPath
        });
      }
      case 'scale':
        return dispatch({
          type: 'SCALE_CHANGE',
          payload: nextValue
        });
      default:
        return dispatch({
          type: 'ERROR',
          payload: 'Error changing settings, no arguments provided.',
          error: true
        });
    }
  };
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
  return async (dispatch, getState) => {
    const state = getState();
    if (hasChangesSelector(state) && isValidSelector(state)) {
      await Promise.all(validSettingsSelector(state).map(s => {
        logger.debug(`Set ${s.name} to ${s.value}`);
        return settings.set(s.name, s.value);
      }));
      dispatch({
        type: 'SETTINGS_SAVE'
      });
    }
  };
}
