import settings from 'electron-settings';
import { windowScale } from 'utils';

/**
 * clientPath: String,
 * dimensions: {
 *  width: Number,
 *  height: Number
 * },
 * scale: Number,
 * lowSpec: Boolean
 */
settings.defaults({
  clientPath: 'C:\\Riot Games\\League of Legends',
  ...windowScale.getInitialWindowDimensions(),
  lowSpec: false
});

settings.applyDefaultsSync();

const PersistentSettings = {
  set: (key, value) => settings.set(key, value),

  get: key => settings.get(key),

  getClientPath () {
    return settings.get('clientPath');
  },

  setClientPath (value) {
    return settings.set('clientPath', value);
  },

  getScaleFactor () {
    return settings.get('scale');
  },

  setScaleFactor (value) {
    return settings.set('scale', value);
  },

  getDimensions () {
//    return settings.get('dimensions');
    return settings.get('scale').then(scale => windowScale.getSize(scale));
  },

  setDimensions (/* value*/) {
//    return settings.set('dimensions', value);
  },

  getLowSpec () {
    return settings.get('lowSpec');
  },

  setLowSpec (value) {
    return settings.set('lowSpec', value);
  }
};

export default PersistentSettings;
