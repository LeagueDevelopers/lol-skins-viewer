import React from 'react';
import { shallow } from 'enzyme';

import RadioInput from '../RadioInput';

const options = [
  { value: 0, label: 'test0' },
  { value: 1, label: 'test1' },
  { value: 2, label: 'test2' },
  { value: 5, label: 'test3' },
];

describe.only('<RadioInput />', () => {
  it('should render correctly', () => {
    const props = {
      handleChange: jest.fn(),
      handleClick: jest.fn(),
      selectedOption: options[1],
      value: options[1].value,
    };
    const wrapper = shallow(<RadioInput options={options} {...props}>Hello</RadioInput>);
    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('should render as many children as the options it is provided', () => {
    const wrapper = shallow(<RadioInput options={options} />);
    expect(wrapper.children().length).toBe(options.length);
  });

  it('should render no children if no options are provided', () => {
    const wrapper = shallow(<RadioInput options={[]} />);
    expect(wrapper.children().length).toBe(0);
  });

  it('should render no children if options is undefined or otherwise lacks a map method', () => {
    const wrapper = shallow(<RadioInput />);
    expect(wrapper.children().length).toBe(0);
  });

  it('should render the correct label for each child', () => {
    const wrapper = shallow(<RadioInput options={options} />);
    wrapper.children().forEach((child, i) => {
      expect(child.props().label).toBe(options[i].label);
    });
  });

  it('should pass the disabled prop to its options', () => {
    const wrapper = shallow(<RadioInput options={options} disabled />);
    wrapper.children().forEach(child => {
      expect(child.props().disabled).toBe(true);
    });
  });

  it('should mark the selected option, using strict equality against the value prop', () => {
    const selectedOption = options[1];
    const value = selectedOption.value;
    const wrapper = shallow(<RadioInput options={options} value={value} />);
    const selected = wrapper.childAt(1);
    const unselectedNodes = wrapper.children()
      .map(child => child.props())
      .filter(child => !child.checked);
    expect(selected.props().checked).toBe(true);
    expect(unselectedNodes).toHaveLength(options.length - 1);
  });

  it('should call onChange with the new value if the selection changes', () => {
    const handleChange = jest.fn();
    const selectedOption = options[1];
    const value = selectedOption.value;

    const wrapper = shallow(<RadioInput options={options} value={value} onChange={handleChange} />);

    handleChange.mockImplementation(v => wrapper.setProps({ value: v }));

    const nextSelect = wrapper.childAt(3);

    nextSelect.simulate('click');
    expect(handleChange).toHaveBeenCalledWith(nextSelect.props().value);

    nextSelect.simulate('click');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('should not call onChange with the new value if the selection does not change', () => {
    const handleChange = jest.fn();
    const selectedOption = options[1];
    const value = selectedOption.value;

    const wrapper = shallow(<RadioInput options={options} value={value} onChange={handleChange} />);

    handleChange.mockImplementation(v => wrapper.setProps({ value: v }));

    const nextSelect = wrapper.childAt(1);

    nextSelect.simulate('click');
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('should call onClick even if the selection does not change', () => {
    const handleClick = jest.fn();
    const selectedOption = options[1];
    const value = selectedOption.value;

    const wrapper = shallow(<RadioInput options={options} value={value} onClick={handleClick} />);

    handleClick.mockImplementation(v => wrapper.setProps({ value: v }));

    const initialSelected = wrapper.childAt(1);
    expect(initialSelected.props().checked).toBe(true);

    const nextSelect = wrapper.childAt(3);

    nextSelect.simulate('click');
    expect(handleClick).toHaveBeenCalledWith(nextSelect.props().value);

    nextSelect.simulate('click');
    expect(handleClick).toHaveBeenCalledWith(nextSelect.props().value);
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it('should fail gracefully if neither onClick or onChange are defined', () => {
    const selectedOption = options[1];
    const value = selectedOption.value;

    const wrapper = shallow(<RadioInput options={options} value={value} />);

    const nextSelect = wrapper.childAt(3);

    nextSelect.simulate('click');
  });
});
