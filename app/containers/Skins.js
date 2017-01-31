import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { remote } from 'electron';

import { sortedSkins, countOwnedSkins } from 'selectors/skins';

import SkinsList from '../components/SkinsList';
import SkinsSidebar from '../components/SkinsSidebar';

import * as skinsActionCreators from '../actions/skins';

@connect(
  state => ({
    lcu: state.app.lcu,
    proxy: state.app.proxy,
    summoner: state.app.summoner,
    hasLoaded: state.skins.hasLoaded,
    sortMethod: state.skins.sortMethod,
    filters: state.skins.filters,
    skins: sortedSkins(state),
    ownedSkinsCount: countOwnedSkins(state)
  }),
  dispatch => ({
    skinsActions: bindActionCreators(skinsActionCreators, dispatch)
  })
)
export default class SkinsContainer extends Component {
  static propTypes = {
    summoner: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    lcu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    proxy: PropTypes.number.isRequired,
    hasLoaded: PropTypes.bool.isRequired,
    skins: PropTypes.array.isRequired,
    sortMethod: PropTypes.string.isRequired,
    filters: PropTypes.object.isRequired,
    ownedSkinsCount: PropTypes.number.isRequired,
    skinsActions: PropTypes.object.isRequired,
    onMount: PropTypes.func,
    onUnmount: PropTypes.func
  }
  componentDidMount () {
    const { hasLoaded, onMount } = this.props;
    // TODO: Move this to a decorator
    onMount && onMount.call && onMount(this);
    if (!hasLoaded) {
      /*
       * if we havent loaded yet, initiate LCUWatcher on the main process
       * subsequent start() calls simply restart the watcher
       */
      const lcuWatcher = remote.getGlobal('LCUWatcher');
      lcuWatcher.start();
    }
  }

  componentWillReceiveProps (nextProps) {
    const { hasLoaded, proxy, lcu, summoner } = this.props;
    if (!hasLoaded && (proxy !== nextProps.proxy || lcu !== nextProps.lcu)) {
      this.reloadSkins(nextProps);
    } else if (summoner !== nextProps.summoner) {
      this.reloadSkins(nextProps);
    }
  }

  componentWillUnmount () {
    const { onUnmount } = this.props;
    onUnmount && onUnmount.call && onUnmount(this);
  }

  reload = () => this.reloadSkins();
  reloadSkins = (props) => {
    const { skinsActions, lcu, proxy, summoner } = props || this.props;
    if (proxy && lcu && summoner) {
      skinsActions.getSkins(proxy, summoner);
    }
  }

  render () {
    const { skins, sortMethod, filters, ownedSkinsCount, skinsActions } = this.props;
    return (
      <section className="skins">
        <SkinsSidebar
          count={ownedSkinsCount}
          sortMethod={sortMethod}
          filters={filters}
          {...skinsActions}
        />
        <SkinsList skins={skins} reload={this.reloadSkins} />
      </section>
    );
  }
}
