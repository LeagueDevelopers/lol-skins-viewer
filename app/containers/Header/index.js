import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from './components/Header';

@connect((state, { location }) => ({
  hasLoaded: state.skins.hasLoaded,
  proxy: state.app.proxy,
  lcu: state.app.lcu,
  summoner: state.app.summoner,
  pathname: location.pathname
}))
export default class HeaderContainer extends Component {
  static propTypes = {
    hasLoaded: PropTypes.bool.isRequired,
    proxy: PropTypes.number.isRequired,
    lcu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    summoner: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    pathname: PropTypes.string.isRequired,
    reload: PropTypes.func.isRequired,
    rootRoute: PropTypes.object.isRequired
  };

  render () {
    const {
      hasLoaded,
      lcu,
      summoner,
      proxy,
      pathname,
      reload,
      rootRoute
    } = this.props;

    return (
      <Header
        summoner={summoner}
        lcu={lcu}
        hasLoaded={hasLoaded}
        proxy={proxy}
        pathname={pathname}
        reload={reload}
        rootRoute={rootRoute}
      />
    );
  }
}
