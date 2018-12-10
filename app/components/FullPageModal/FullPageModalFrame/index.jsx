import React from 'react';

import CloseButton from './close-button';

import styles from './index.scss';

export default ({ onClose }) =>
  <div className={styles.frame}>
    <div className={styles.frameLeft} />
    <div className={styles.frameRight} />
    <div className={styles.closeBtnFrame}>
      <div className={styles.outer}>
        <div className={styles.inner}>
          <CloseButton onClick={onClose} />
        </div>
      </div>
    </div>
  </div>;
