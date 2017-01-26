import React, { PropTypes } from 'react';
import Markdown from 'react-markdown';

import style from './index.scss';

export default function ReleaseNotes ({ notes }) {
  return (
    <div className={style.releaseNotes}>
      <Markdown source={notes} />
    </div>
  );
}

ReleaseNotes.propTypes = {
  notes: PropTypes.string
};
