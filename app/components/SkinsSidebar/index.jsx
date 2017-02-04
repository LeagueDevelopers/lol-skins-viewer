import React, { PureComponent, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import cx from 'classnames';

import { filterOptions, sortingOptions } from 'selectors/skins';

import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import RadioInput from 'components/RadioInput';
import SummaryRing from 'components/SummaryRing';

import style from './index.scss';

export default class SkinsSidebar extends PureComponent {
  static propTypes = {
    rpTotal: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    filters: PropTypes.object.isRequired,
    sortMethod: PropTypes.string.isRequired,
    changeNameFilter: PropTypes.func.isRequired,
    changeShowFilter: PropTypes.func.isRequired,
    changeSortMethod: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props);

    this.state = {
      summary: false,
      search: ''
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
    const { changeNameFilter, filters } = this.props;
    if (filters.name !== nextValue) {
      changeNameFilter(nextValue);
    }
  }

  debounced = debounce(this.changeNameFilter, 300)

  render () {
    const {
      rpTotal = 0,
      count,
      sortMethod,
      filters,
      changeShowFilter,
      changeSortMethod
    } = this.props;

    const { summary, search } = this.state;

    return (
      <div className={style.sidebar}>
        <SummaryRing
          className={cx(style.ring, summary && style.rotated)}
          value={!summary ? count : rpTotal}
          onClick={this.toggleSummary}
        >
          {!summary ? 'Total Skins' : 'Estimated RP Value'}
        </SummaryRing>
        <div className={style.filters}>
          <Input type="search" value={search} onChange={this.handleSearchChange} placeholder="Search" />
          <Dropdown options={filterOptions} value={filters.show} onChange={changeShowFilter} />
          <RadioInput options={sortingOptions} value={sortMethod} onChange={changeSortMethod} />
        </div>
      </div>
    );
  }
}
