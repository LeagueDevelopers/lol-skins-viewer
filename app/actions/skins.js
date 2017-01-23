import type { Summoner } from 'types';
import { getData } from 'api/SkinsController';

export function getSkins (port: number, password: string, summoner: Summoner) {
  return dispatch =>
    getData(port, password, summoner)
    .then(data => {
      if (data && data.champions && data.ownedChampionIds) {
        return dispatch({
          type: 'RECEIVE_SKINS',
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

export function changeNameFilter (nextValue) {
  return {
    type: 'SKINS_FILTER_NAME_CHANGE',
    payload: nextValue
  };
}

export function changeShowFilter (nextValue) {
  return {
    type: 'SKINS_FILTER_SHOW_CHANGE',
    payload: nextValue
  };
}
