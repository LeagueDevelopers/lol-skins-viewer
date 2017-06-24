import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { sortedSkins, rpTotal, countOwnedSkins } from 'selectors/skins';

import SkinsList from '../components/SkinsList';
import SkinsSidebar from '../components/SkinsSidebar';

import * as skinsActionCreators from '../actions/skins';

@connect(
  state => ({
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
