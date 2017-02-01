/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */

/**
 * This file exists because webpack module resolution magic has its flaws.
 * When testing we will want import modules that may `import { moduleName } from 'utils';`,
 * therefore, when that happens, all modules in utils are loaded. To avoid that we must
 * create yet another index file that uses getters in order to avoid loading a module
 * unless it is actually being used for the test in question.
 *
 * This is completely pointless when running the full test suite but is quite useful
 * when writing tests
 *
 * There will still be cases where you will have to mock 'utils' in order to simulate
 * either the Main process or the Renderer process environment.
 */

Object.defineProperty(module.exports, 'call', {
  get: () => require('./call')
});

Object.defineProperty(module.exports, 'env', {
  get: () => require('./env')
});

Object.defineProperty(module.exports, 'windowScale', {
  get: () => require('./windowScale')
});
