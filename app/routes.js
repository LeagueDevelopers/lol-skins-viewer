import React from 'react';
import { Route, IndexRoute } from 'react-router';

import TabbedContainer from 'containers/TabbedContainer';

import App from 'containers/App';
import Skins from 'containers/Skins';
import Settings from 'containers/Settings';
import ReleaseNotes from 'containers/ReleaseNotes';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Skins} />
    <Route path="settings" component={TabbedContainer}>
      <IndexRoute name="Settings" component={Settings} />
      <Route name="Release Notes" path="releasenotes" component={ReleaseNotes} />
    </Route>
  </Route>
);
