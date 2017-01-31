import React, { PropTypes, PureComponent } from 'react';
import Option from 'components/RadioOption';
import { call } from 'utils';

import style from './index.scss';

/**
 * RadioInput Component
 *
 * Options without label prop must have a key prop
 * onClick is exposed in case full control is needed
 */
export default class RadioInput extends PureComponent {
  static propTypes = {
    value: PropTypes.any,
    onClick: PropTypes.func,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired
  }
  handleSelect = option => {
    const { value, onChange, onClick } = this.props;
    if (call(onClick, option.value)) {
      return false;
    }
    if (option.value !== value) {
      call(onChange, option.value);
    }
  }
  render () {
    const { options, value } = this.props;
    return (
      <div className={style.radioInput}>
        {options.map(o =>
          <Option
            key={o.label || o.key}
            checked={o.value === value}
            onClick={() => this.handleSelect(o)}
            label={o.label}
          >
            {o.children}
          </Option>)}
      </div>
    );
  }
}
