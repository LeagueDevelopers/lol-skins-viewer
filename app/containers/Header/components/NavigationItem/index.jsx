import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import { hashHistory } from 'react-router';
import cx from 'classnames';

import style from './index.scss';

function NavigationItem (props) {
  const { to, children, router, index } = props;
  const isActive = router.isActive(to, index);
  return (
    <div className={style.navigationItemWrapper}>
      <div className={cx(style.navigationItem, { [style.active]: isActive })}>
        <span
          role="navigation"
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
  router: PropTypes.object.isRequired,
  index: PropTypes.bool
};

NavigationItem.defaultProps = {
  index: false
};

export default pure(NavigationItem);
