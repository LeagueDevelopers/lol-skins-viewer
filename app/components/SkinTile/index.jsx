import React from 'react';
import { pure } from 'recompose';

import Image from 'components/Image';

import type { Skin } from 'types';

import style from './index.scss';


function SkinTile (props: Skin) {
  const { name, tilePath } = props;
  return (
    <div className={style.skinTile}>
      <Image className={style.skinTileBg} path={tilePath} />
      <span className={style.skinName}>{name}</span>
    </div>
  );
}

export default pure(SkinTile);
