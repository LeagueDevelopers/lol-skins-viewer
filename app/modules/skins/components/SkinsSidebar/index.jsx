import React, { PureComponent, PropTypes } from 'react';
import debounce from 'lodash.debounce';
import cx from 'classnames';

import { filterOptions, sortingOptions } from 'selectors/skins';

import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import RadioInput from 'components/RadioInput';
import SummaryRing from '../SummaryRing';

import style from './index.scss';

export default class SkinsSidebar extends PureComponent {
  static propTypes = {
    rpTotal: PropTypes.number,
    count: PropTypes.number,
    filters: PropTypes.object,
    sortMethod: PropTypes.string,
    changeNameFilter: PropTypes.func.isRequired,
    changeShowFilter: PropTypes.func.isRequired,
    changeSortMethod: PropTypes.func.isRequired
  };

  static defaultProps = {
    rpTotal: 0,
    count: 0,
    filters: {},
    sortMethod: 'ALPHABETICAL'
  }

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
    const {
      rpTotal,
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
