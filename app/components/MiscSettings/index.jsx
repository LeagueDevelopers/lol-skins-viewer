import React, { PropTypes } from 'react';

import Checkbox from 'components/Checkbox';

import style from './index.scss';

export default function MiscSettings ({ changeSetting, value }) {
  return (
    <div className={style.miscSettings}>
      <div className={style.info} >
        Miscellaneous
      </div>
      <Checkbox value={value} onChange={changeSetting.bind(this, 'lowSpec')}>Low Spec Mode</Checkbox>
    </div>
  );
}

MiscSettings.propTypes = {
  value: PropTypes.bool.isRequired,
  changeSetting: PropTypes.func.isRequired
};
