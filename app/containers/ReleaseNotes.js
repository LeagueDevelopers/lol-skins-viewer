import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReleaseNotes from '../components/ReleaseNotes';

import * as releaseNotesActionCreators from '../actions/releaseNotes';

@connect(
  state => ({
    releaseNotes: state.releaseNotes.notes,
    lastChecked: state.releaseNotes.lastChecked
  }),
  dispatch => ({
    releaseNotesActions: bindActionCreators(releaseNotesActionCreators, dispatch)
  })
)
export default class ReleaseNotesContainer extends Component {
  static propTypes = {
    releaseNotes: PropTypes.array,
    lastChecked: PropTypes.any,
    releaseNotesActions: PropTypes.object.isRequired
  }

  componentWillMount () {
    const { releaseNotesActions, lastChecked } = this.props;
    releaseNotesActions.fetchReleaseNotes(lastChecked);
  }

  render () {
    const { releaseNotes } = this.props;
    return (
      <section className="release-notes">
        <ReleaseNotes notes={releaseNotes} />
      </section>
    );
  }
}
