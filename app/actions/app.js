// @flow
import type { Summoner } from '../types';

export function up (instance: Object) {
  if (instance) {
    return {
      type: 'LCU_UP',
      payload: instance
    };
  }
  return {
    type: 'ERROR',
    payload: 'No LCU Instance provided',
    error: true
  };
}

export function login (summoner: Summoner) {
  if (summoner) {
    return {
      type: 'LCU_LOGIN',
      payload: summoner
    };
  }
  return {
    type: 'ERROR',
    payload: 'No Summoner provided',
    error: true
  };
}

export function down () {
  return {
    type: 'LCU_DOWN'
  };
}

export function newVersion (value) {
  return {
    type: 'NEW_VERSION',
    payload: value || true
  };
}

export function updateProgress (percent) {
  return {
    type: 'UPDATE_PROGRESS',
    payload: percent
  };
}
