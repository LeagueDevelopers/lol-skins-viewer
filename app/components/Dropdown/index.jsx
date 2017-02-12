import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import style from './index.scss';

/**
 * LoL UIKit Dropdown
 * Receives options in a array of objects with value and label properties
 * value should be present in one of the options' value property
 */
export default class Dropdown extends PureComponent {
  static propTypes = {
    className: PropTypes.any,
    value: PropTypes.any,
    onChange: PropTypes.func,
    options: PropTypes.array.isRequired
  }

  constructor (props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  componentDidMount () {
    document.addEventListener('click', this.handleDocumentClick, false);
    document.addEventListener('touchend', this.handleDocumentClick, false);
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.handleDocumentClick, false);
    document.removeEventListener('touchend', this.handleDocumentClick, false);
  }

  onOptionClick = nextValue => {
    const { onChange } = this.props;
    this.setState({
      isOpen: false
    });
    onChange && onChange.call && onChange(nextValue);
    return false;
  }

  handleDocumentClick = event => {
    if (!this.mounted && !this.domElement.contains(event.target)) {
      this.setState({ isOpen: false });
    }
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
    return false;
  }

  renderOption = (option, selectedValue) => {
    const isSelected = option.value === selectedValue;
    const classnames = cx(style.option, { [style.selected]: isSelected });
    return (
      <div
        key={option.value}
        role="option"
        aria-selected={isSelected}
        className={classnames}
        onClick={() => this.onOptionClick(option.value)}
      >
        {option.label}
      </div>
    );
  }

  render () {
    const { options, className, value } = this.props;
    const { isOpen: isOpenState } = this.state;
    const isOpen = !!isOpenState;
    const selected = options.find(o => o.value === value);
    return (
      <div
        ref={e => { this.domElement = e; }}
        role="combobox"
        aria-expanded={isOpen}
        className={cx(style.dropdown, className)}
        onClick={this.toggle}
      >
        <div className={cx(style.control, isOpen && style.active)}>
          {selected ? selected.label : 'Select...'}
          <span className={style.arrow} />
        </div>
        <div
          role="listbox"
          aria-hidden={!isOpen}
          className={cx(style.options, { [style.hidden]: !isOpen })}
        >
          {options.map(o => this.renderOption(o, value))}
        </div>
      </div>
    );
  }
}
