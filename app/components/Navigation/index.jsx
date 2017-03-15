import React, { PropTypes } from 'react';
import cx from 'classnames';

import NavigationItem from 'components/NavigationItem';

import style from './index.scss';

function Navigation ({ className, currentPath }) {
  return (
    <nav className={cx(style.navigation, className)}>
      <NavigationItem to="/modules/skins" currentPath={currentPath} index>Skins</NavigationItem>
      <NavigationItem to="/settings" currentPath={currentPath} index={false}>Settings</NavigationItem>
    </nav>
  );
}

Navigation.propTypes = {
  currentPath: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Navigation;
