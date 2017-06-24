import React, { PropTypes, PureComponent } from 'react';
import FlipMove from 'react-flip-move';

import Frame from '../Frame';

import styles from './index.scss';

class Toasts extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    toasts: PropTypes.array.isRequired
  }

  closeToast = toastId => {
    const { dispatch } = this.props;

    dispatch({
      type: 'CLOSE_TOAST',
      payload: toastId
    });
  }

  render () {
    const { toasts } = this.props;

    return (
      <div className={styles.toasts}>
        <FlipMove
          enterAnimation="fade"
          leaveAnimation="none"
        >
          {toasts.map(toast =>
            <div
              className={styles.toast}
              key={toast.id}
              onClick={() => this.closeToast(toast.id)}
            >
              <Frame message={toast.message} />
            </div>)
          }
        </FlipMove>
      </div>
    );
  }
}

export default Toasts;
