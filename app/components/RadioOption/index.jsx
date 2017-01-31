import React, { PropTypes } from 'react';
import cx from 'classnames';
import { pure } from 'recompose';

import style from './index.scss';

function RadioOption ({ children, label, checked, onClick, ...otherProps }) {
  return (
    <div
      className={cx(style.radioOption, checked && style.active)}
      onClick={onClick}
      {...otherProps}
    >
      <div className={style.square} />
      <span className={style.text}>{children || label}</span>
    </div>
  );
}

RadioOption.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func
};

export default pure(RadioOption);
