import React, { PropTypes } from 'react';
import cx from 'classnames';

import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';

import style from './index.scss';

export default function Frame ({ className, options, title, message, children }) {
  return (
    <div className={cx(style.dialog, className)}>
      <div className={style.contentWrapper}>
        <div className={cx(style.content, !options && style.noButtons)}>
          {children && children}
          {!children && title && <h1>{title}</h1>}
          {!children && message && <p>{message}</p>}
        </div>
        {options && <ButtonGroup className={style.buttonGroup}>
          {options.map((o, i) => <Button key={`button_${i}`} {...o} />)}
        </ButtonGroup>}
      </div>
      <div className={style.border} />
    </div>
  );
}

Frame.propTypes = {
  className: PropTypes.string,
  options: PropTypes.array,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node
};

Frame.defaultProps = {
  className: undefined,
  options: undefined,
  title: undefined,
  message: undefined,
  children: undefined
};
