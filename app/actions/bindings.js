export function openEditor (id) {
  return {
    type: 'OPEN_EDITOR',
    payload: { id }
  };
}

export function closeEditor () {
  return {
    type: 'CLOSE_EDITOR'
  };
}

export function changeNameFilter (nextValue) {
  return {
    type: 'SKINS_FILTER_NAME_CHANGE',
    payload: nextValue || ''
  };
}

export function changeShowFilter (nextValue) {
  return {
    type: 'SKINS_FILTER_SHOW_CHANGE',
    payload: nextValue
  };
}

export function changeSortMethod (nextValue) {
  return {
    type: 'SKINS_SORT_METHOD_CHANGE',
    payload: nextValue
  };
}
