import React from 'react';

import styles from './index.scss';

export default ({ onClick }) =>
  <div className={styles.closeButton} onClick={onClick}>
    <div className={styles.content}>
      <div className={styles.xIcon} />
    </div>
  </div>;
