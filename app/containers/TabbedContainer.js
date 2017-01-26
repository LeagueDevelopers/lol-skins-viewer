import React, { PropTypes } from 'react';
import TabNavigationItem from 'components/TabNavigationItem';

export default function TabbedContainer ({ router, route, children }) {
  let childRoutes = route.childRoutes.slice();
  route.indexRoute && childRoutes.unshift({ ...route.indexRoute });
  childRoutes = childRoutes.map(r => ({
    ...r,
    path: r.path ? `/${route.path}/${r.path}` : `/${route.path}`,
    isActive: router.isActive(r.path ? `/${route.path}/${r.path}` : `/${route.path}`, true)
  }));
  return (
    <div className="tabbed-container">
      <div className="tabs">
        {childRoutes.map(r => <TabNavigationItem key={r.path} to={r.path} isActive={r.isActive}>{r.name}</TabNavigationItem>)}
      </div>
      {children}
    </div>
  );
}

TabbedContainer.propTypes = {
  router: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};
