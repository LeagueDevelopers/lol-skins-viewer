import React, { PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

export default function ButtonGroup ({ className, children }) {
  return (
    <div className={cx(style.buttonGroup, className)}>
      <div className={style.content}>
        {children}
      </div>
    </div>
  );
}

ButtonGroup.propTypes = {
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};
