import React from 'react';
import { shallow, mount } from 'enzyme';

import SummaryRing from '../SummaryRing';

describe('<SummaryRing />', () => {
  it('should render correctly', () => {
    const labelWrapper = shallow(
      <SummaryRing
        className="test"
        value={9999}
        onClick={() => false}
        label="test1"
      />);
    const childrenWrapper = shallow(
      <SummaryRing
        className="test"
        value={9999}
        onClick={() => false}
      >
        test2
      </SummaryRing>);

    expect(labelWrapper.get(0)).toMatchSnapshot();
    expect(childrenWrapper.get(0)).toMatchSnapshot();
  });

  it('should call onClick when it is clicked', () => {
    const handleClick = jest.fn();

    // Mount because we want to check if click events "bubble" properly
    const wrapper = mount(<SummaryRing onClick={handleClick} />);

    wrapper.simulate('click');
    wrapper.find('.value').simulate('click');
    wrapper.find('.text').simulate('click');

    expect(handleClick).toHaveBeenCalledTimes(3);
  });

  it('should prefer children to label prop', () => {
    const label = 'marksmen';
    const child = 'in2017';

    const wrapper = shallow(<SummaryRing label={label}>{child}</SummaryRing>);

    expect(wrapper.find('.text').text()).toBe(child);
  });

  it('should change font-size in order to fit its value', () => {
    const wrapper = shallow(<SummaryRing value={9999} />);
    const fontSize1 = wrapper.find('.value').props().style.fontSize;

    expect(fontSize1).toBe('40px');

    wrapper.setProps({ value: 999999 });
    const fontSize2 = wrapper.find('.value').props().style.fontSize;

    expect(fontSize2).not.toBe(fontSize1);

    wrapper.setProps({ value: 9999999 });
    const fontSize3 = wrapper.find('.value').props().style.fontSize;

    expect(fontSize3).not.toBe(fontSize1);
    expect(fontSize3).not.toBe(fontSize2);
  });
});
