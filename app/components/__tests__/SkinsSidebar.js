import React from 'react';
import { shallow, mount } from 'enzyme';

import { sortingOptions } from 'selectors/skins';

import SkinsSidebar from '../SkinsSidebar';

jest.useFakeTimers();

jest.mock('lodash.debounce', () => {
  let debounced;
  const debounce = (fn, timeout) => {
    const res = val => {
      debounced = () => fn(val);
      setTimeout(debounced, timeout);
    };
    res.flush = () => debounced();
    return res;
  };
  return debounce;
});

describe('<SkinsSidebar />', () => {
  it('should render correctly', () => {
    const props = {
      rpFiltered: 1234,
      count: 50,
      filters: {
        show: 'OWNED'
      },
      sortMethod: sortingOptions[0].value,
      changeShowFilter: jest.fn(),
      changeSortMethod: jest.fn()
    };

    const wrapper = shallow(<SkinsSidebar {...props} />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('should toggle between RP Total and Skins Count', () => {
    ['ALL', 'OWNED', 'UNOWNED'].forEach((type) => {
      const props = {
        rpFiltered: 1234,
        count: 50,
        filters: {
          show: type
        }
      };
      const wrapper = shallow(<SkinsSidebar {...props} />);

      expect(wrapper.first().childAt(0).props().children).toBe(`${type} Skins`);
      expect(wrapper.first().childAt(0).props().value).toBe(props.count);

      wrapper.instance().toggleSummary();

      expect(wrapper.first().childAt(0).props().children).toBe('Estimated RP Value');
      expect(wrapper.first().childAt(0).props().value).toBe(props.rpFiltered);
    });
  });

  it('should debounce search change calls', () => {
    const handleNameChange = jest.fn();

    const wrapper = mount(
      <SkinsSidebar filters={{ name: 'Jinx' }} changeNameFilter={handleNameChange} />
    );
    const searchInput = wrapper.childAt(1).childAt(0);

    handleNameChange.mockImplementation(name => wrapper.setProps({ filters: { name } }));

    expect(searchInput.props().value).toBe('Jinx');

    wrapper.instance().handleSearchChange('Leona');

    expect(searchInput.props().value).toBe('Leona');
    expect(handleNameChange).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();

    expect(handleNameChange).toHaveBeenCalledWith('Leona');
  });

  it('should immediately flush pending debounced calls on unmount', () => {
    const handleNameChange = jest.fn();

    const wrapper = mount(
      <SkinsSidebar filters={{ name: 'Jinx' }} changeNameFilter={handleNameChange} />
    );

    const searchInput = wrapper.childAt(1).childAt(0);

    expect(searchInput.props().value).toBe('Jinx');

    wrapper.instance().handleSearchChange('Leona');

    expect(searchInput.props().value).toBe('Leona');
    expect(handleNameChange).not.toHaveBeenCalled();

    wrapper.unmount();

    expect(handleNameChange).toHaveBeenCalledWith('Leona');
  });
});
