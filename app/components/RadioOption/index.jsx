import React, { PropTypes } from 'react';
import cx from 'classnames';
import { pure } from 'recompose';

import style from './index.scss';

function RadioOption ({ children, value, label, checked, disabled, onClick }) {
  return (
    <div
      className={cx(style.radioOption, checked && style.checked, disabled && style.disabled)}
      onClick={() => onClick(value)}
    >
      <div className={style.checkbox}>
        <div className={style.square} />
      </div>
      <span className={style.text}>{children || label}</span>
    </div>
  );
}

RadioOption.propTypes = {
  children: PropTypes.node,
  value: PropTypes.any,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  onClick: PropTypes.func
};

export default pure(RadioOption);
