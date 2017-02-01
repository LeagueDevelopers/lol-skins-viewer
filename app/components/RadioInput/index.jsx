import React, { PropTypes, PureComponent } from 'react';
import Option from 'components/RadioOption';
import { call } from 'utils';

import style from './index.scss';


/**
 * RadioInput Component
 *
 * @export
 * @class RadioInput
 * @extends {PureComponent}
 */
export default class RadioInput extends PureComponent {

  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    onClick: PropTypes.func,
    onChange: PropTypes.func,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.obj])
  }

  /**
   * Called when an option is selected. If the option
   * is different from what is currently selected,
   * onChange is called.
   * If the onClick prop was provided to the component,
   * it is called every time an option is clicked.
   *
   * @memberOf RadioInput
   * @param {Object} option the which was clicked
   */
  handleSelect = option => {
    const { value, onChange, onClick } = this.props;
    call(onClick, option.value);
    if (option.value !== value) {
      call(onChange, option.value);
    }
  }

  render () {
    const { children, options, disabled, value } = this.props;
    const shouldRenderOptions = options && options.map && options.map.call;
    return (
      <div className={style.radioInput}>
        {shouldRenderOptions && options.map(o =>
          <Option
            key={o.label || o.key}
            checked={o.value === value}
            disabled={disabled || o.disabled || false}
            onClick={() => this.handleSelect(o)}
            label={o.label}
            value={o.value}
          />)}
        {children}
      </div>
    );
  }
}
