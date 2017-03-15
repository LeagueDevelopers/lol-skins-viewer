import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';

import TabbedContainer from 'containers/TabbedContainer';

import App from 'containers/App';
import Settings from 'containers/Settings';
import ReleaseNotes from 'containers/ReleaseNotes';

export default class ModularRouter extends Component {
  static propTypes = {
    history: PropTypes.any.isRequired,
    manager: PropTypes.any.isRequired
  }

  constructor (props) {
    super(props);

    this.state = {
      routes: {}
    };
  }

  componentWillMount () {
    this.updateRoutes();
  }

  componentDidMount () {
    this.props.manager.on('module-loaded', this.updateRoutes);
  }

  updateRoutes = () => this.setState({ routes: this.props.manager.getRoutes() });

  render () {
    const routes = this.state.routes;
    return (
      <Router history={this.props.history}>
        <Route path="/" component={App}>
          <IndexRedirect to="settings" />
          <Route path="settings" component={TabbedContainer}>
            <IndexRoute name="Settings" component={Settings} />
            <Route name="Release Notes" path="releasenotes" component={ReleaseNotes} />
          </Route>
          <Route path="modules">
            {routes.map(r =>
              <Route {...r} />
            )}
          </Route>
        </Route>

      </Router>
    );
  }
}
