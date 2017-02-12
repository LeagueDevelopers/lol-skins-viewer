import React from 'react';
import { shallow } from 'enzyme';

import Checkbox from 'components/Checkbox';

describe('<Checkbox />', () => {
  it('should render correctly', () => {
    const checkedWrapper = shallow(
      <Checkbox onChange={() => false} className="testClass" value>
        Test 1
      </Checkbox>
    );
    const uncheckedWrapper = shallow(
      <Checkbox onChange={() => false} className="testClass" value={false}>
        Test 2
      </Checkbox>
    );

    expect(checkedWrapper.get(0)).toMatchSnapshot();
    expect(uncheckedWrapper.get(0)).toMatchSnapshot();
  });

  it('should appear checked if its value is true', () => {
    const wrapper = shallow(
      <Checkbox onChange={() => false} value label="test" />
    );

    expect(wrapper.hasClass('checked')).toBe(true);
  });

  it('should not appear checked if its value is falsey', () => {
    const falseWrapper = shallow(
      <Checkbox onChange={() => false} value={false} label="test" />
    );
    const nullWrapper = shallow(
      <Checkbox onChange={() => false} value={false} label="test" />
    );
    const undefinedWrapper = shallow(
      <Checkbox onChange={() => false} value={undefined} label="test" />
    );

    expect(falseWrapper.hasClass('checked')).toBe(false);
    expect(nullWrapper.hasClass('checked')).toBe(false);
    expect(undefinedWrapper.hasClass('checked')).toBe(false);
  });

  it('should call onChange with the new value when it is clicked', () => {
    const handleChange = jest.fn();
    const wrapper = shallow(
      <Checkbox onChange={handleChange} value={false} label="test" />
    );

    handleChange.mockImplementation(v => wrapper.setProps({ value: v }));

    wrapper.simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith(true);

    wrapper.simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith(false);
  });

  it('should call onClick if it defined', () => {
    const handleChange = jest.fn();
    const handleClick = jest.fn();

    const wrapper = shallow(
      <Checkbox onClick={handleClick} onChange={handleChange} value={false} label="test" />
    );

    wrapper.simulate('click');
    expect(handleChange).toHaveBeenLastCalledWith(true);
    expect(handleClick).toHaveBeenCalled();
  });

  it('should prefer props.children to props.label', () => {
    const label = 'test1';
    const text = 'hello';

    const wrapper = shallow(
      <Checkbox label={label}>{text}</Checkbox>
    );

    expect(wrapper.find('.label').text()).toBe(text);
  });

  it('should have a className passed by props', () => {
    const className = 'test1';

    const wrapper = shallow(
      <Checkbox className={className}>Hello</Checkbox>
    );

    expect(wrapper.hasClass(className));
  });
});
