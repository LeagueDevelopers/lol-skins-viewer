import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import './index.scss';

export default class Input extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
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
  onReset = () => {
    const { onChange } = this.props;
    if (onChange && onChange.call) {
      onChange('');
    }
  }
  render () {
    const { className, value, type, placeholder, hideClear, children } = this.props;
    const showClear = hideClear ? false : value !== '';
    return (
      <div className={cx('inputWrapper', className)}>
        <i
          className={cx('inputReset', { show: showClear })}
          onClick={this.onReset}
        />
        <input
          type={type}
          className={'input'}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
        />
        {children}
      </div>
    );
  }
}
