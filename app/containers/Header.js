import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Header from 'components/Header';

@connect((state, ownProps) => ({
  hasLoaded: state.bindings.hasLoaded,
  proxy: state.app.proxy,
  lcu: state.app.lcu,
  summoner: state.app.summoner,
  pathname: ownProps.location.pathname,
  newVersion: state.app.newVersion,
  updateProgress: state.app.updateProgress
}))
export default class HeaderContainer extends Component {
  static propTypes = {
    hasLoaded: PropTypes.bool.isRequired,
    proxy: PropTypes.number.isRequired,
    lcu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    summoner: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    pathname: PropTypes.string.isRequired,
    newVersion: PropTypes.bool.isRequired,
    updateProgress: PropTypes.number.isRequired,
    reload: PropTypes.func.isRequired
  };

  render () {
    const {
      hasLoaded,
      lcu,
      summoner,
      proxy,
      pathname,
      newVersion,
      updateProgress,
      reload
    } = this.props;

    return (
      <Header
        summoner={summoner}
        lcu={lcu}
        hasLoaded={hasLoaded}
        proxy={proxy}
        pathname={pathname}
        newVersion={newVersion}
        updateProgress={updateProgress}
        reload={reload}
      />
    );
  }
}
