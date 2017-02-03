import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import { filterOptions, sortingOptions } from 'selectors/skins';

import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import RadioInput from 'components/RadioInput';
import SummaryRing from 'components/SummaryRing';

import style from './index.scss';

export default class SkinsSidebar extends Component {
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
      summary: false
    };
  }

  toggleSummary = () => {
    this.setState({ summary: !this.state.summary });
  }

  render () {
    const {
      rpTotal = 9999999,
      count,
      sortMethod,
      filters,
      changeNameFilter,
      changeShowFilter,
      changeSortMethod
    } = this.props;

    const { summary } = this.state;

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
          <Input type="search" value={filters.name} onChange={changeNameFilter} placeholder="Search" />
          <Dropdown options={filterOptions} value={filters.show} onChange={changeShowFilter} />
          <RadioInput options={sortingOptions} value={sortMethod} onChange={changeSortMethod} />
        </div>
      </div>
    );
  }
}
