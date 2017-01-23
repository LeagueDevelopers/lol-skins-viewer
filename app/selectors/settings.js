import { createSelector } from 'reselect';

const settingsSelector = state => state.settings;

/**
 * Gets all properties that correspond to a changeable setting
 * @type {Array}
 */
export const settingSelector = createSelector(
  settingsSelector,
  settings => Object.entries(settings)
    .map(([k, v]) => ({ ...v, name: k }))
    .filter(v => Object.prototype.hasOwnProperty.call(v, 'hasChanged'))
);

/**
 * See if there are any changed settings
 * @type {Boolean}
 */
export const hasChangesSelector = createSelector(
  settingSelector,
  settingObjs => settingObjs.some(s => s.hasChanged)
);

/**
 * Get all changed settings
 * @type {Array}
 */
export const changedSettingsSelector = createSelector(
  settingSelector,
  settingObjs => settingObjs.filter(s => s.hasChanged && s.isValid)
);

/**
 * Get all valid (and changed) settings
 * @type {Array}
 */
export const validSettingsSelector = createSelector(
  changedSettingsSelector,
  settingObjs => settingObjs.filter(s => s.isValid)
);

/**
 * Checks if the current settings state is valid (read: saveable)
 * @type {Boolean}
 */
export const isValidSelector = createSelector(
  settingSelector,
  settingObjs => settingObjs.every(s => s.isValid)
);
