import u from 'updeep';

const DEFAULT_STATE = {
  submitting: false
};

export default function share (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'SHARE_SKINS_BEGIN':
      return u({ submitting: true }, state);
    case 'SHARE_SKINS_SUCCESS':
      return u({ submitting: false }, state);
    case 'SHARE_SKINS_ERROR':
      return u({ submitting: false }, state);
    default:
      return state;
  }
}
