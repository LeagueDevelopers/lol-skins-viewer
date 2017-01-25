import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from 'containers/App';
import Skins from 'containers/Skins';
import Settings from 'containers/Settings';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={Skins} />
    <Route path="settings" component={Settings} />
  </Route>
);
