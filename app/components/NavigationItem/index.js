import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import { hashHistory } from 'react-router';
import cx from 'classnames';

import style from './index.scss';

function NavigationItem (props) {
  const { to, children, className, currentPath, index } = props;
  // naive... change to router.isActive eventually
  const isActive = index ? currentPath === to : currentPath.includes(to);
  return (
    <div className={cx(style.navigationItemWrapper, className)}>
      <div className={cx(style.navigationItem, { [style.active]: isActive })}>
        <span
          className={style.content}
          onClick={() => !isActive && hashHistory.push(to)}
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
  currentPath: PropTypes.string.isRequired,
  index: PropTypes.bool
};

export default pure(NavigationItem);
