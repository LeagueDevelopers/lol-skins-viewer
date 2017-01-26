import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import { hashHistory } from 'react-router';
import cx from 'classnames';

import style from './index.scss';

function NavigationItem (props) {
  const { to, children, className, isActive } = props;
  return (
    <div className={cx(style.navigationItemWrapper, className)}>
      <div className={cx(style.navigationItem, { [style.active]: isActive })}>
        <span
          className={style.content}
          onClick={() => !isActive && hashHistory.replace(to)}
        >
          {children}
        </span>
      </div>
    </div>
  );
}

NavigationItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  currentPath: PropTypes.string,
  index: PropTypes.bool,
  tab: PropTypes.bool,
  isActive: PropTypes.bool
};

export default pure(NavigationItem);
