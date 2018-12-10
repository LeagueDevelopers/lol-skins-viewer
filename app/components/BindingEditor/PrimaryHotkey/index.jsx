import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import styles from './index.scss';

class PrimaryHotkey extends Component {
  static propTypes = {
    bind: PropTypes.object.isRequired,
    quickcastBind: PropTypes.object.isRequired
  }

  render () {
    const { bind, quickcastBind } = this.props;

    return (
      <div className={cx(styles.primaryHotkey, { [styles.quickcast]: quickcastBind ? !!quickcastBind.value : Math.random() > 0.5 })}>
        <div className={styles.background}>
          <div className={styles.button}>
            {bind ? bind.value : 'Q'}
          </div>
          <div className={styles.spacer} />
          <div className={cx(styles.quickcastButton)}>
            <svg
              className={styles.spark}
              x="0px" y="0px"
              viewBox="0 0 11.3 16" enableBackground="new 0 0 11.3 16"
            >
              <polygon points="11.3,7 6.8,7 8.3,0 0,8.8 4.2,8.8 2.8,16 " />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

export default PrimaryHotkey;
