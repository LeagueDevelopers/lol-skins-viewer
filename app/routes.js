import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import TabbedContainer from 'containers/TabbedContainer';

import App from 'containers/App';
import Skins from 'containers/Skins';
import Share from 'containers/Share';
import Settings from 'containers/Settings';
import ReleaseNotes from 'containers/ReleaseNotes';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="skins" />
    <Route path="skins" component={TabbedContainer}>
      <IndexRoute name="Skins" component={Skins} />
      <Route name="Export" path="export" component={Share} />
    </Route>
    <Route path="settings" component={TabbedContainer}>
      <IndexRoute name="Settings" component={Settings} />
      <Route name="Release Notes" path="releasenotes" component={ReleaseNotes} />
    </Route>
  </Route>
);
