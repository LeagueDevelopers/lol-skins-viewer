const debugArg = process.argv.some(val => val === '--debug');
const _isDev = debugArg || process.env.NODE_ENV === 'development'; // eslint-disable-line
const _isProd = process.env.NODE_ENV === 'production'; // eslint-disable-line

export default {
  isDev () {
    return _isDev;
  },

  isProd () {
    return _isProd;
  }
};
