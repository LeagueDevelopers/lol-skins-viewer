import React, { PureComponent, PropTypes } from 'react';
import debounce from 'lodash.debounce';

import { filterOptions, sortingOptions } from 'selectors/champions';

import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import RadioInput from 'components/RadioInput';

import style from './index.scss';

export default class Sidebar extends PureComponent {
  static propTypes = {
    filters: PropTypes.object,
    changeNameFilter: PropTypes.func,
  };

  constructor (props) {
    super(props);

    let initialSearch = '';

    if (props.filters && props.filters.name) {
      initialSearch = props.filters.name;
    }

    this.state = {
      summary: false,
      search: initialSearch
    };
  }

  componentWillUnmount () {
    this.debounced.flush();
  }

  toggleSummary = () => {
    this.setState({ summary: !this.state.summary });
  }

  handleSearchChange = nextValue => {
    this.setState({ search: nextValue });
    this.debounced(nextValue);
  }

  changeNameFilter = nextValue => {
    const { changeNameFilter } = this.props;
    changeNameFilter(nextValue);
  }

  debounced = debounce(this.changeNameFilter, 300)

  render () {
    const { search } = this.state;

    return (
      <div className={style.sidebar}>
        <div className={style.filters}>
          <Input type="search" value={search} onChange={this.handleSearchChange} placeholder="Search" />
        </div>
      </div>
    );
  }
}
