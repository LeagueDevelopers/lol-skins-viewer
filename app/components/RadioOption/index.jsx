import React, { PropTypes } from 'react';
import cx from 'classnames';
import { pure } from 'recompose';

import style from './index.scss';

function RadioOption ({ children, label, checked, disabled, onClick, ...otherProps }) {
  return (
    <div
      className={cx(style.radioOption, checked && style.checked, disabled && style.disabled)}
      onClick={onClick}
      {...otherProps}
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
  label: PropTypes.string,
  disabled: PropTypes.bool,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default pure(RadioOption);
