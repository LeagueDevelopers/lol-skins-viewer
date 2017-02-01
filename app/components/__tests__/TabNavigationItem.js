import React from 'react';
import { shallow } from 'enzyme';

import TabNavigationItem from '../TabNavigationItem';

describe('<TabNavigationItem />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(
      <TabNavigationItem onClick={() => false} className="testClass" isActive>
        {'Test Route'}
      </TabNavigationItem>
    );
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('should have the .active class when isActive is true', () => {
    const wrapper = shallow(
      <TabNavigationItem onClick={() => false} isActive>
        {'Test Route'}
      </TabNavigationItem>
    );
    expect(wrapper.hasClass('active')).toBe(true);
  });

  it('should not have the .active class when isActive is falsey', () => {
    const wrapper = shallow(
      <TabNavigationItem onClick={() => false} isActive={false}>
        {'Test Route'}
      </TabNavigationItem>
    );
    expect(wrapper.hasClass('active')).toBe(false);
    wrapper.setProps({ isActive: null });
    expect(wrapper.hasClass('active')).toBe(false);
    wrapper.setProps({ isActive: undefined });
    expect(wrapper.hasClass('active')).toBe(false);
  });

  it('should render its children', () => {
    const wrapper = shallow(
      <TabNavigationItem>
        Test Route
      </TabNavigationItem>
    );
    expect(wrapper.find('.content').text()).toBe('Test Route');
  });

  it('should call onClick when its text content is clicked', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(
      <TabNavigationItem onClick={handleClick} isActive={false}>
        {'Test Route'}
      </TabNavigationItem>
    );
    wrapper.find('.content').simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
