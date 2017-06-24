import React, { PropTypes } from 'react';
import ReactModal from 'react-modal';

import Frame from 'components/Button';

import style from './index.scss';

export default function Modal (props) {
  return (
    <ReactModal isOpen={props.isOpen} className={style.modal} overlayClassName={style.overlay} contentLabel="modal">
      <Frame {...props} />
    </ReactModal>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired
};
