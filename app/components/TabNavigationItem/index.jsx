import React, { PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

function NavigationItem (props) {
  const { onClick, children, className, isActive } = props;
  return (
    <div className={cx(style.navigationItem, isActive && style.active, className)}>
      <div className={style.contentWrapper}>
        <span
          className={style.content}
          onClick={onClick}
        >
          {children}
        </span>
      </div>
    </div>
  );
}

NavigationItem.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  isActive: PropTypes.bool
};

export default NavigationItem;
