import React, { PropTypes } from 'react';

import { filterOptions, sortingOptions } from 'selectors/skins';

import Dropdown from 'components/Dropdown';
import Input from 'components/Input';
import RadioInput from 'components/RadioInput';

import style from './index.scss';

const SkinsSidebar = ({ count, sortMethod, filters, changeNameFilter, changeShowFilter, changeSortMethod }) => (
  <div className={style.sidebar}>
    <div className={style.summary}>
      <span className={style.skinsCount}>{count}</span>
      <span className={style.skinsText}>Total Skins</span>
    </div>
    <div className={style.filters}>
      <Input type="search" value={filters.name} onChange={changeNameFilter} placeholder="Search" />
      <Dropdown options={filterOptions} value={filters.show} onChange={changeShowFilter} />
      <RadioInput options={sortingOptions} value={sortMethod} onChange={changeSortMethod} />
    </div>
  </div>
  );

SkinsSidebar.propTypes = {
  count: PropTypes.number.isRequired,
  filters: PropTypes.object.isRequired,
  sortMethod: PropTypes.string.isRequired,
  changeNameFilter: PropTypes.func.isRequired,
  changeShowFilter: PropTypes.func.isRequired,
  changeSortMethod: PropTypes.func.isRequired
};

export default SkinsSidebar;
