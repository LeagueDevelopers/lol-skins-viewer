import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReleaseNotes from '../components/ReleaseNotes';

import * as releaseNotesActionCreators from '../actions/releaseNotes';

@connect(
  state => ({
    releases: state.releaseNotes.releases,
    lastChecked: state.releaseNotes.lastChecked
  }),
  dispatch => ({
    releaseNotesActions: bindActionCreators(releaseNotesActionCreators, dispatch)
  })
)
export default class ReleaseNotesContainer extends Component {
  static propTypes = {
    releases: PropTypes.array.isRequired,
    lastChecked: PropTypes.any.isRequired,
    releaseNotesActions: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { releaseNotesActions, lastChecked } = this.props;
    releaseNotesActions.fetchReleaseNotes(lastChecked);
  }

  render () {
    const { releases } = this.props;
    return (
      <section className="release-notes">
        {releases.map(release => <ReleaseNotes key={release.name} notes={release.body} />)}
      </section>
    );
  }
}
