import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sortedSkins, rpTotal, countOwnedSkins } from 'selectors/skins';

import SkinsList from './components/SkinsList';
import SkinsSidebar from './components/SkinsSidebar';

import * as skinsActionCreators from './actions';

@connect(
  state => ({
    lcu: state.app.lcu,
    proxy: state.app.proxy,
    summoner: state.app.summoner,
    hasLoaded: state.skins.hasLoaded,
    sortMethod: state.skins.sortMethod,
    filters: state.skins.filters,
    skins: sortedSkins(state),
    collectionValue: rpTotal(state),
    ownedSkinsCount: countOwnedSkins(state),
    lowSpec: state.settings.lowSpec.value
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
    collectionValue: PropTypes.number,
    ownedSkinsCount: PropTypes.number.isRequired,
    lowSpec: PropTypes.bool,
    skinsActions: PropTypes.object.isRequired
  };

  static defaultProps = {
    collectionValue: 0,
    lowSpec: false
  }

  componentDidMount () {
    const { hasLoaded } = this.props;
    if (!hasLoaded) {
      this.reloadSkins();
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

  reload = () => this.reloadSkins();
  reloadSkins = props => {
    const { skinsActions, lcu, proxy, summoner } = props || this.props;
    if (proxy && lcu && summoner) {
      skinsActions.getSkins(proxy, summoner);
    }
  };

  render () {
    const {
      skins,
      sortMethod,
      filters,
      collectionValue,
      ownedSkinsCount,
      lowSpec,
      skinsActions
    } = this.props;
    return (
      <section className="skins">
        <SkinsSidebar
          rpTotal={collectionValue}
          count={ownedSkinsCount}
          sortMethod={sortMethod}
          filters={filters}
          {...skinsActions}
        />
        <SkinsList skins={skins} reload={this.reloadSkins} disableAnimations={lowSpec} />
      </section>
    );
  }
}
