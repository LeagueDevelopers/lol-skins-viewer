import React, { PropTypes, PureComponent } from 'react';
import LazyLoad from 'react-lazyload';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Image from 'components/Image';

import style from './index.scss';

export default class SkinTile extends PureComponent {
  static propTypes = {
    id: PropTypes.any,
    name: PropTypes.string,
    tilePath: PropTypes.string.isRequired
  }
  render () {
    const { id, name, tilePath } = this.props;
    return (
      <div className={style.skinTile}>
        <LazyLoad
          once
          overflow
          offset={550}
          placeholder={<div className={style.placeholder} />}
        >
          <ReactCSSTransitionGroup
            key={`t_${id}`}
            transitionName="fade"
            transitionAppear
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
          >
            <Image key={tilePath} className={style.background} path={tilePath} />
          </ReactCSSTransitionGroup>
        </LazyLoad>
        <span className={style.name}>{name}</span>
      </div>
    );
  }
}
