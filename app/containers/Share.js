import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { ownedSkins } from 'selectors/skins';

import ThirdPartyExport from '../components/ThirdPartyExport';

import * as shareActionCreators from '../actions/share';

@connect(
  state => ({
    hasLoaded: state.skins.hasLoaded,
    submitting: state.share.submitting,
    skins: ownedSkins(state)
  }),
  dispatch => ({
    shareActions: bindActionCreators(shareActionCreators, dispatch)
  })
)
export default class ShareContainer extends Component {
  static propTypes = {
    hasLoaded: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    skins: PropTypes.array.isRequired,
    shareActions: PropTypes.object.isRequired
  };

  render () {
    const {
      hasLoaded,
      skins,
      submitting,
      shareActions
    } = this.props;
    return (
      <section className="content">
        {!hasLoaded && <h1>Loading...</h1>}
        {hasLoaded && <ThirdPartyExport {...shareActions} submitting={submitting} skins={skins} />}
      </section>
    );
  }
}
