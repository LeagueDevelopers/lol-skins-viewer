import { getChampions } from 'api/SummonerController';

export function updateChampions (port, password, summoner) {
  return dispatch =>
    getChampions(port, password, summoner.id)
      .then(data => {
        if (data) {
          return dispatch({
            type: 'RECEIVE_CHAMPIONS',
            payload: data
          });
        }
        return dispatch({
          type: 'ERROR',
          payload: data,
          error: true
        });
      });
}

export function up (instance) {
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

export function login (summoner) {
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
