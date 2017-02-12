import React, { PropTypes } from 'react';

import Checkbox from 'components/Checkbox';

import style from './index.scss';

export default function UIScale ({ changeSetting, value }) {
  return (
    <div className={style.miscSettings}>
      <div className={style.info} >
        Miscellaneous
      </div>
      <Checkbox value={value} onChange={changeSetting.bind(this, 'lowSpec')}>Low Spec Mode</Checkbox>
    </div>
  );
}

UIScale.propTypes = {
  value: PropTypes.number.isRequired,
  changeSetting: PropTypes.func.isRequired
};
