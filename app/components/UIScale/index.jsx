import React, { PropTypes } from 'react';

import Dropdown from 'components/Dropdown';

import style from './index.scss';

const options = [
  { value: 0.75, label: 'Small (1024 * 578)' },
  { value: 1, label: 'Normal (1280 * 720)' },
  { value: 1.25, label: 'Large (1600 * 900)' }
];

export default function UIScale ({ changeSetting, value }) {
  return (
    <div className={style.uiScale}>
      <div className={style.info} >
        UI Scale
      </div>
      <div className={style.dropdownWrapper}>
        <Dropdown options={options} onChange={v => changeSetting('scale', v)} value={value} />
      </div>
    </div>
  );
}

UIScale.propTypes = {
  value: PropTypes.number.isRequired,
  changeSetting: PropTypes.func.isRequired
};
