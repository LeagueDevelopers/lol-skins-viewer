import { remote } from 'electron';
import React, { PureComponent, PropTypes } from 'react';
import settings from 'electron-settings';
import { windowScale } from 'utils';

import Header from 'containers/Header';

export default class App extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired, // from react-redux
    children: PropTypes.node.isRequired
  }

  componentDidMount () {
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

  componentWillUnmount () {
    if (this.scaleObserver && this.scaleObserver.dispose) {
      this.scaleObserver.dispose();
    }
  }

  registerChild = child => {
    if (!this.childRefs) {
      this.childRefs = [];
    }
    if (this.childRefs.indexOf(child) === -1) {
      this.childRefs.push(child);
    }
  }

  unregisterChild = child => {
    if (!this.childRefs) {
      this.childRefs = [];
    }
    const index = this.childRefs.indexOf(child);
    if (index >= 0) {
      this.childRefs = this.childRefs.slice(index, 1);
    }
  }

  reload = () => {
    if (this.childRefs && this.childRefs.length) {
      this.childRefs.forEach(child => {
        if (child && child.reload && child.reload.call) {
          child.reload();
        }
      });
    }
  }

  render () {
    const { location } = this.props;
    // dirty af tbh
    // ghetto solution to imperatively reloading components
    // from parent component using the child's specific logic
    const children = React.Children.map(this.props.children, child => React.cloneElement(child, {
      onMount: comp => {
        this.registerChild(comp);
      },
      onUnmount: comp => {
        this.unregisterChild(comp);
      }
    }));
    return (
      <div className="app">
        <Header reload={this.reload} location={location} />
        {children}
      </div>
    );
  }
}
