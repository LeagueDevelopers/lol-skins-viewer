const DEFAULT_STATE = [];

let counter = 0;

export default function toasts (state = DEFAULT_STATE, action) {
  if (action.type && action.type === 'CLOSE_TOAST' && typeof action.payload === 'number') {
    return state.filter(t => t.id !== action.payload);
  }

  if (action && action.meta === 'toast' && action.payload) {
    counter += 1;
    return [{ message: action.payload.message, id: counter }].concat(state);
  }

  return state;
}
