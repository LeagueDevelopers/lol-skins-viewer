import request from 'request-promise-native';

export function fetchReleaseNotes (lastChecked = new Date(0).toUTCString()) {
  return dispatch => request({
    uri: 'https://api.github.com/repos/leagueoss/lol-skins-viewer/releases',
    headers: {
      'User-Agent': 'lol-skins-viewer',
      'If-Modified-Since': lastChecked
    },
    json: true
  })
  .then(res => {
    const releases = res.map(r => ({ body: r.body, name: r.name })) || [];
    const nextLastChecked = releases.length ? new Date().toUTCString() : lastChecked;
    return dispatch({
      type: 'RECEIVE_RELEASE_NOTES',
      payload: {
        releases,
        lastChecked: nextLastChecked
      }
    });
  })
  .catch(err => dispatch({
    type: 'ERROR',
    payload: err,
    error: true
  }));
}
