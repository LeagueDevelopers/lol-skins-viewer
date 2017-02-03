import React, { PropTypes } from 'react';
import { pure } from 'recompose';
import FlipMove from 'react-flip-move';
import { forceCheck } from 'react-lazyload';

import style from './index.scss';

import SkinTile from '../SkinTile';

function SkinsList ({ skins }) {
  return (
    <section className={style.skinsList}>
      <FlipMove onFinishAll={forceCheck}>
        {skins && skins.map(skin => <SkinTile key={`skin_${skin.id}`} {...skin} />)}
      </FlipMove>
    </section>
  );
}

SkinsList.propTypes = {
  skins: PropTypes.array.isRequired
};

export default pure(SkinsList);
