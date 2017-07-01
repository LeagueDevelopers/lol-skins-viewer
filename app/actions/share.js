import request from 'request-promise-native';

import { ownedSkins } from '../selectors/skins';

export function share (uri) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SHARE_SKINS_BEGIN'
    });

    const state = getState();
    const { summoner } = state.app;

    const skins = ownedSkins(state).map(s => ({ skinId: s.id, rpValue: s.rpValue }));

    request({
      uri,
      method: 'POST',
      body: {
        summonerId: summoner.id,
        platformId: summoner.platformId,
        skins
      },
      json: true
    })
    .then(() => dispatch({
      type: 'SHARE_SKINS_SUCCESS',
      payload: {
        message: 'Successfully shared skins list'
      },
      meta: 'toast'
    }))
    .catch(res => {
      let message = 'Error: Please check the URL. The server may be offline';

      if (res.response) {
        message = `Error ${res.response.statusCode}: ${res.response.statusMessage}`;
      }

      dispatch({
        type: 'SHARE_SKINS_ERROR',
        payload: {
          message
        },
        meta: 'toast'
      });
    });
  };
}
