import React, { PropTypes } from 'react';
import ReactModal from 'react-modal';
import cx from 'classnames';

import ButtonGroup from 'components/ButtonGroup';
import Button from 'components/Button';

import style from './index.scss';

export default function Modal ({ className, options, isOpen, title, message, children }) {
  return (
    <ReactModal isOpen={isOpen} className={style.modal} overlayClassName={style.overlay} contentLabel="modal">
      <div className={cx(style.dialog, className)}>
        <div className={style.contentWrapper}>
          <div className={style.content}>
            {children && children}
            {!children && <h1>{title}</h1>}
            {!children && <p>{message}</p>}
          </div>
          <ButtonGroup className={style.buttonGroup}>
            {options.map((o, i) => <Button key={`button_${i}`} {...o} />)}
          </ButtonGroup>
        </div>
        <div className={style.border} />
      </div>
    </ReactModal>
  );
}

Modal.propTypes = {
  className: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  children: PropTypes.node
};
