import { remote } from 'electron';
import path from 'path';
import fs from 'fs';
import isValidPath from 'is-valid-path';
import isRelative from 'is-relative';
import normalize from 'normalize-path';

function resolvePath (nextPath) {
  try {
    return isRelative(nextPath) ?
    path.resolve(remote.app.getPath('exe'), nextPath)
    : nextPath;
    // Pokemon LUL
  } catch (e) {
    return false;
  }
}

/* This might not be very performant, consider not validating
 * on every update?
 *
 * isValid: true if it is the League directory
 */
export default function validatePath (nextPath) {
  if (!nextPath) {
    return {
      value: '',
      isValidPath: false,
      isValid: false
    };
  }
  if (!isValidPath(nextPath)) {
    return {
      value: nextPath,
      isValidPath: false,
      isValid: false
    };
  }
  const absolutePath = resolvePath(nextPath);
  if (!absolutePath || !fs.existsSync(absolutePath)) {
    return {
      value: nextPath,
      isValidPath: false,
      isValid: false
    };
  }
  const stats = fs.lstatSync(absolutePath);
  const dirIsValid = stats.isDirectory();
  // TODO: OSX Compatibility
  const files = fs.readdirSync(absolutePath);
  const isValid =
    files.some(f => /LeagueClient\.[a-z]{3}/i.test(f))
    && files.some(f => f === 'RADS');
  return {
    value: isValid ? normalize(nextPath) : nextPath,
    isValidPath: dirIsValid,
    isValid
  };
}
