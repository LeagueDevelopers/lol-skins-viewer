import React from 'react';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { pure } from 'recompose';

import Image from 'components/Image';

import type { Skin } from 'types';

import style from './index.scss';


function SkinTile (props: Skin) {
  const { name, tilePath } = props;
  return (
    <div className={style.skinTile}>
      <LazyLoad once overflow resize offset={400}>
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionAppear
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
        >
          <Image key={tilePath} className={style.skinTileBg} path={tilePath} />
        </ReactCSSTransitionGroup>
      </LazyLoad>
      <span className={style.skinName}>{name}</span>
    </div>
  );
}

export default pure(SkinTile);
