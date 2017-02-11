import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

export default class Input extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    inputClassName: PropTypes.string,
    value: PropTypes.string.isRequired,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    hideClear: PropTypes.bool,
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired
  }
  onChange = event => {
    const { onChange } = this.props;
    if (onChange && onChange.call) {
      onChange(event.target.value);
      return false;
    }
  }
  onClear = () => {
    const { onChange } = this.props;
    if (onChange && onChange.call) {
      onChange('');
    }
  }
  render () {
    const { className, inputClassName, value, type, placeholder, hideClear, children } = this.props;
    const showClear = hideClear ? false : value !== '';
    return (
      <div className={cx(style.input, className)}>
        <i
          className={cx(style.clear, { show: showClear })}
          onClick={this.onClear}
        />
        <input
          type={type}
          className={cx(style.inputElement, inputClassName)}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {children}
      </div>
    );
  }
}
