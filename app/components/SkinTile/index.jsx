import React, { PropTypes, PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Image from 'components/Image';

import style from './index.scss';

export default class SkinTile extends PureComponent {
  static propTypes = {
    name: PropTypes.string,
    tilePath: PropTypes.string.isRequired
  }
  render () {
    const { name, tilePath } = this.props;
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
}
