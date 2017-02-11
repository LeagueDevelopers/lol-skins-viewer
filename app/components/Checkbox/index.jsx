import React, { PropTypes } from 'react';
import { call } from 'utils';
import cx from 'classnames';

import style from './index.scss';


/**
 * <Checkbox />
 *
 * A controlled checkbox.
 * onClick is called with the click event,
 * onChange is called with next value
 *
 * TODO: Disabled state
 */
function Checkbox (props) {
  const { className, children, value, label, onClick, onChange } = props;
  return (
    <div
      role="checkbox"
      aria-checked={value}
      className={cx(style.checkbox, value && style.checked, className)}
      onClick={evt => handleClick(evt, onClick, onChange, value)}
    >
      <div className={style.box}>
        <div className={style.border} />
        <i className={cx(style.check, style.iconCheck)} />
      </div>
      <span className={style.label}>{children || label}</span>
    </div>
  );
}

function handleClick (event, onClick, onChange, value) {
  call(onClick, event);
  call(onChange, !value);
}

Checkbox.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string,
  value: PropTypes.bool,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default Checkbox;
