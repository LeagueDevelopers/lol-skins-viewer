/* eslint-disable react/prefer-es6-class */
import React, { PropTypes } from 'react';
import tweenState from 'react-tween-state';

/**
 * <AnimatedNumber />
 *
 * Tweens its value every time it changes
 */
const AnimatedNumber = React.createClass({
  propTypes: {
    duration: PropTypes.number,
    value: PropTypes.number
  },
  mixins: [tweenState.Mixin],
  getInitialState () {
    return { value: 0 };
  },
  componentDidMount () {
    this.tweenState('value', {
      duration: this.props.duration || 600,
      beginValue: 0,
      endValue: this.props.value
    });
  },
  componentWillReceiveProps (nextProps) {
    if (this.props.value === nextProps.value) {
      return;
    }
    this.tweenState('value', {
      duration: this.props.duration || 600,
      endValue: nextProps.value
    });
  },
  render () {
    return <span {...this.props}>{Math.floor(this.getTweeningValue('value'))}</span>;
  }
});

export default AnimatedNumber;
