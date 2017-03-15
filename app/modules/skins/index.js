import actions from './actions';
import reducer from './reducer';
import container from './container';

const route = {
  path: 'skins',
  index: true,
  indexRoute: { component: container }
};

export default {
  name: 'skins',
  actions,
  reducer,
  container,
  route
};
