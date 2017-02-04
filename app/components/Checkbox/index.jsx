import React, { PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

function Checkbox (props) {
  const { className, children, value, label, onChange } = props;
  return (
    <div
      className={cx(style.checkbox, value && style.checked, className)}
      onClick={() => onChange(!value)}
    >
      <div className={style.box}>
        <div className={style.border} />
        <i className={cx(style.check, style.iconCheck)} />
      </div>
      <span className={style.label}>{children || label}</span>
    </div>
  );
}

Checkbox.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  children: PropTypes.node
};

export default Checkbox;
