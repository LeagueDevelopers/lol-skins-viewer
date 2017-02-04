import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';

import { hasChangesSelector, isValidSelector } from 'selectors/settings';

import * as settingsActionCreators from 'actions/settings';

import PathPicker from 'components/PathPicker';
import UIScale from 'components/UIScale';
import Modal from 'components/Modal';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';

@withRouter
@connect(
  state => ({
    clientPath: state.settings.clientPath,
    scale: state.settings.scale,
    lowSpec: state.settings.lowSpec,
    hasChanges: hasChangesSelector(state),
    isValid: isValidSelector(state)
  }),
  dispatch => ({
    settingsActions: bindActionCreators(settingsActionCreators, dispatch)
  })
)
export default class Settings extends Component {
  static propTypes = {
    clientPath: PropTypes.object.isRequired,
    scale: PropTypes.object.isRequired,
    lowSpec: PropTypes.object.isRequired,
    hasChanges: PropTypes.bool.isRequired,
    isValid: PropTypes.bool.isRequired,
    settingsActions: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
    route: PropTypes.object.isRequired
  };
  constructor (props) {
    super(props);
    this.state = {
      transition: false,
      nextLocation: undefined
    };
  }
  componentDidMount () {
    const unbind = this.props.router.setRouteLeaveHook(this.props.route, this.routerWillLeave);
    this.unbindRouteLeaveHook = unbind; // No effect on rendering, stored as instance variable
  }
  routerWillLeave = (nextLocation) => {
    if (this.props.hasChanges) {
      this.setState({
        transition: true,
        nextLocation
      });
      return false;
    }
  }
  confirmNavigation = () => {
    const { router, settingsActions } = this.props;
    const { nextLocation } = this.state;
    settingsActions.resetSettings();
    this.unbindRouteLeaveHook();
    router.push(nextLocation);
  };
  cancelNavigation = () => this.setState({
    transition: false,
    nextLocation: undefined // just in case :)
  })
  save = () => {
    const { settingsActions } = this.props;
    settingsActions.saveSettings();
    return false;
  }
  renderModal () {
    return (
      <Modal
        isOpen
        title="DISCARD CHANGES?"
        message="You have unsaved changes, do you wish to discard them and leave?"
        options={[
          { text: 'Yes', onClick: this.confirmNavigation },
          { text: 'No', onClick: this.cancelNavigation }
        ]}
      />
    );
  }
  render () {
    const { clientPath, scale, lowSpec, hasChanges, isValid, settingsActions } = this.props;
    const { transition } = this.state;
    return (
      <div className="settings">
        {transition && this.renderModal()}
        <div className="container">
          <PathPicker {...clientPath} {...settingsActions} />
          <UIScale {...scale} {...settingsActions} />
          <Checkbox value={lowSpec.value} onChange={settingsActions.changeSetting.bind(this, 'lowSpec')}>Low Spec Mode</Checkbox>
        </div>
        <div className="actions">
          <Button
            className="save"
            onClick={this.save}
            disabled={!hasChanges || !isValid}
          >
            Save Changes
          </Button>
        </div>
      </div>
    );
  }
}
