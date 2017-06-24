import React, { PureComponent, PropTypes } from 'react';
import { remote } from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import settings from 'electron-settings';
import { windowScale } from 'utils';

import Header from 'containers/Header';
import ToastsComponent from 'components/Toasts';

import { getSkins } from '../actions/skins';

const Toasts = connect(state => ({ toasts: state.toasts }))(ToastsComponent);

@connect(
  state => ({
    lcu: state.app.lcu,
    proxy: state.app.proxy,
    summoner: state.app.summoner,
    hasLoaded: state.skins.hasLoaded
  }),
  dispatch => ({
    skinsActions: bindActionCreators({ getSkins }, dispatch)
  })
)
export default class App extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired, // from react-redux
    children: PropTypes.node.isRequired,
    summoner: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    lcu: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]).isRequired,
    proxy: PropTypes.number.isRequired,
    hasLoaded: PropTypes.bool.isRequired,
    // eslint-disable-next-line
    skinsActions: PropTypes.object.isRequired
  }

  componentDidMount () {
    const { hasLoaded } = this.props;
    if (!hasLoaded) {
      /*
       * if we havent loaded yet, initiate LCUWatcher on the main process
       * subsequent start() calls simply restart the watcher
       */
      const lcuWatcher = remote.getGlobal('LCUWatcher');
      lcuWatcher.start();
    }

    this.scaleObserver = settings.observe('scale', ({ oldValue, newValue }) => {
      if (oldValue !== newValue) {
        const newSize = windowScale.getSize(newValue);
        const clampedScale = windowScale.clampScaleFactor(newValue);
        const currentWindow = remote.getCurrentWindow();
        currentWindow.setSize(newSize.width, newSize.height);
        remote.getCurrentWebContents().setZoomFactor(clampedScale);
        currentWindow.center();
      }
    });
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
    if (this.scaleObserver && this.scaleObserver.dispose) {
      this.scaleObserver.dispose();
    }
  }

  reloadSkins = props => {
    const { skinsActions, lcu, proxy, summoner } = props || this.props;
    if (proxy && lcu && summoner) {
      skinsActions.getSkins(proxy, summoner);
    }
  };

  reload = () => { this.reloadSkins(); }

  render () {
    const { children, location, summoner, lcu, proxy, hasLoaded } = this.props;
    const child = React.cloneElement(React.Children.only(children), {
      summoner,
      lcu,
      proxy,
      hasLoaded
    });

    return (
      <div className="app">
        <Header reload={this.reload} location={location} />
        {child}
        <Toasts />
      </div>
    );
  }
}
