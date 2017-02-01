import React from 'react';
import { shallow, mount } from 'enzyme';

import RadioOption from '../RadioOption';

describe('<RadioOption />', () => {
  it('should render two children', () => {
    const wrapper = mount(<RadioOption checked />);
    expect(wrapper.children().length).toBe(2);
  });

  it('should render its label using props.label', () => {
    const o = { label: 'testlabel', value: 'testvalue' };
    const wrapper = mount(<RadioOption
      checked
      disabled={false}
      onClick={() => false}
      label={o.label}
    />);
    expect(wrapper.find('.text').text()).toBe(o.label);
  });

  it('should render its label using props.children', () => {
    const child = 'testchild';
    const o = { label: 'testlabel', value: 'testvalue' };
    const wrapper = mount(<RadioOption
      checked
      disabled={false}
      onClick={() => false}
      label={o.label}
    >
      {child}
    </RadioOption>);
    expect(wrapper.find('.text').text()).toBe('testchild');
  });

  it('should have the class "checked" if it is checked', () => {
    const wrapper = mount(<RadioOption checked />);
    expect(wrapper.first().hasClass('checked')).toBe(true);
  });

  it('should not have the class "checked" if it isn\'t checked', () => {
    const wrapper = shallow(<RadioOption checked={false} />);
    expect(wrapper.first().hasClass('checked')).toBe(false);
  });

  it('should have the class "disabled" if it is disabled', () => {
    const wrapper = mount(<RadioOption disabled />);
    expect(wrapper.first().hasClass('disabled')).toBe(true);
  });

  it('should call onClick when it\'s clicked', () => {
    const handleClick = jest.fn();
    const wrapper = shallow(<RadioOption checked={false} onClick={handleClick} />);
    wrapper.simulate('click');
    expect(handleClick).toHaveBeenCalled();
  });
});
