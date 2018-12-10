import u from 'updeep';

const DEFAULT_STATE = {
  editing: false,
  hasChanges: false,
  confirmCloseModal: false,
  filters: {
    show: 'OWNED',
    name: ''
  },
  sortMethod: 'ALPHABETICAL'
};

export default function skins (state = DEFAULT_STATE, action) {
  switch (action.type) {
    case 'OPEN_EDITOR':
      return u({
        editing: {
          id: action.payload.id,
          original: action.payload.bindings,
          current: action.payload.bindings
        }
      }, state);
    case 'CLOSE_EDITOR': {
      if (state.hasChanges) return u({ confirmCloseModal: true }, state);

      return u({ editing: false }, state);
    }
    case 'SKINS_FILTER_NAME_CHANGE':
      return u({ filters: { name: action.payload } }, state);
    case 'SKINS_FILTER_SHOW_CHANGE':
      return u({ filters: { show: action.payload } }, state);
    case 'SKINS_SORT_METHOD_CHANGE':
      return u({ sortMethod: action.payload }, state);
    default:
      return state;
  }
}
