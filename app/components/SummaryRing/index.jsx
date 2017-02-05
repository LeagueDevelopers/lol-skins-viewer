import React, { PropTypes } from 'react';
import cx from 'classnames';

import AnimatedNumber from 'components/AnimatedNumber';

import ring from 'static/ring.png';

import style from './index.scss';

const SummaryRing = ({ className, onClick, value, label, children }) =>
  <div className={cx(style.summaryRing, className)} onClick={onClick}>
    <img role="presentation" className={style.bg} src={ring} />
    <AnimatedNumber className={style.value} value={value} />
    <span className={style.text}>{children || label}</span>
  </div>;

SummaryRing.propTypes = {
  className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  value: PropTypes.any,
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node
};

export default SummaryRing;
