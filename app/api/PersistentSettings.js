import settings from 'electron-settings';
import { windowScale } from 'utils';

/**
 * clientPath: String,
 * dimensions: {
 *  width: Number,
 *  height: Number
 * },
 * scale: Number
 */
settings.defaults({
  clientPath: 'C:\\Riot Games\\League of Legends',
  ...windowScale.getInitialWindowDimensions()
});

settings.applyDefaultsSync();

const PersistentSettings = {
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
  }
};

export default PersistentSettings;
