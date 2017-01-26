import u from 'updeep';

const DEFAULT_STATE = {
  releases: [],
  lastChecked: new Date(0).toUTCString()
};

export default function releaseNotes (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'RECEIVE_RELEASE_NOTES':
      return u({ ...action.payload }, state);
    default:
      return state;
  }
}
