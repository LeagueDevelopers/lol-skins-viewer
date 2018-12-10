import React, { Component, Children, PropTypes } from 'react';

import styles from './index.scss';

import Frame from './FullPageModalFrame';

class FullPageModal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired
  }

  render () {
    const { children, onClose } = this.props;

    return (
      <div className={styles.fullPageModal}>
        <Frame onClose={onClose} />
        {Children.only(children)}
      </div>
    );
  }
}

export default FullPageModal;
