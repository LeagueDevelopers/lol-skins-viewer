import React, { PropTypes } from 'react';
import { pure } from 'recompose';

import style from './index.scss';

import SkinTile from '../SkinTile';

function SkinsList ({ skins }) {
  return (
    <section className={style.skinsList}>
      {skins && skins.map(skin => <SkinTile key={`skin_${skin.id}`} {...skin} />)}
    </section>
  );
}

SkinsList.propTypes = {
  skins: PropTypes.array.isRequired
};

export default pure(SkinsList);
