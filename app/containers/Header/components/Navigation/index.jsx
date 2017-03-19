import React, { PropTypes } from 'react';
import cx from 'classnames';
import { withRouter } from 'react-router';

import NavItem from '../NavigationItem';

import style from './index.scss';

const NavigationItem = withRouter(NavItem);

function getRoutes ({ childRoutes }) {
  if (!childRoutes) return [];

  const moduleRoute = childRoutes.find(r => r.path === 'modules');

  if (!moduleRoute || !moduleRoute.childRoutes) return [];

  return moduleRoute.childRoutes.map(r => ({ path: `/modules/${r.path}`, name: r.name }));
}

function Navigation ({ className, rootRoute }) {
  return (
    <nav className={cx(style.navigation, className)}>
      <nav>
        <NavigationItem to="/" index>Home</NavigationItem>
        {rootRoute && getRoutes(rootRoute).map(route =>
          <NavigationItem to={route.path} key={route.path}>{route.name}</NavigationItem>
        )}
      </nav>
      <nav className={style.right}>
        <NavigationItem to="/settings">Settings</NavigationItem>
      </nav>
    </nav>
  );
}

Navigation.propTypes = {
  rootRoute: PropTypes.object.isRequired,
  className: PropTypes.string
};

Navigation.defaultProps = {
  className: ''
};

export default Navigation;
